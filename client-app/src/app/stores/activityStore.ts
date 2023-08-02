import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid'
import { useParams } from "react-router-dom";

export default class activityStore {
    //activities: activity[] = [];
    activityRegister = new Map<String, activity>();
    selectedActivity: activity | undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    // title = " this is mobx";
    constructor() {
        makeAutoObservable(this, {
            // title: observable
        })
    }
    // // create arrow function to make it autobind to the class
    // setTitle = () => {
    //     this.title = this.title + "!";
    // }
    setLoadingInitial = (value: boolean) => {
        this.loadingInitial = value;
    }
    get activityByDate() {
        return Array.from(this.activityRegister.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    }

    loadingActivities = async () => {
        this.loadingInitial = true;
        // this.setLoadingInitial(true);
        const activities = await agent.Actitivities.list();
        activities.forEach((data) => {
            // data.date = data.date.split("T")[0];
            // // this.activities.push(data);
            // this.activityRegister.set(data.id, data);
            this.setActivity(data);
        })

        this.setLoadingInitial(false);
    }
    loadActivity = async (id: string) => {
        let activity = this.activityRegister.get(id);
        if (activity) {
            this.selectedActivity = activity
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Actitivities.details(id)
                this.setActivity(activity)
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error)
                this.loadingInitial = false;
            }


        }

    }

    // selectingActivity = (id: string) => {
    //     //let { id } = useParams();
    //     //console.log(id);
    //     this.selectedActivity = this.activityRegister.get(id);

    // }
    private setActivity = (data: activity) => {
        data.date = data.date.split("T")[0];
        // this.activities.push(data);
        this.activityRegister.set(data.id, data);

    }
    // cancelselectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }
    // openForm = (id?: string) => {
    //     id ? this.selectingActivity(id) : this.cancelselectedActivity();
    //     this.editMode = true;
    // }
    // closeForm = () => {
    //     this.editMode = false;
    // }
    createActivity = async (activity: activity) => {
        this.loading = true;
        try {
            activity.id = uuid();
            await agent.Actitivities.create(activity);
            runInAction(() => {
                this.activityRegister.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {

            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }

    }
    updateActivity = async (activity: activity) => {
        try {
            this.loading = true;
            await agent.Actitivities.update(activity);
            runInAction(() => {
                //this.activities = this.activities.filter(x => x.id !== activity.id)
                this.activityRegister.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {

            console.log(error + 'in update part')
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    DeleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Actitivities.delete(id);
            runInAction(() => {
                //this.activities = this.activities.filter(x => x.id !== id);
                this.activityRegister.delete(id);
                //if (this.selectedActivity?.id === id) { this.cancelselectedActivity() }
                this.loading = false;
            }
            )
        } catch (error) {
            console.log("error in deleting " + error)
        }
    }
}

