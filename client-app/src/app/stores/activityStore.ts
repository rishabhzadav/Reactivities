import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid'

export default class activityStore {
    //activities: activity[] = [];
    activityRegister = new Map<String, activity>();
    selectedActivity: activity | undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = true;

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
    loadingActivitiy = async () => {
        //this.loadingInitial = true;
        // this.setLoadingInitial(true);
        const activities = await agent.Actitivities.list();
        activities.forEach((data) => {
            data.date = data.date.split("T")[0];
            // this.activities.push(data);
            this.activityRegister.set(data.id, data);
        })
        //this.loadingInitial = false;
        this.setLoadingInitial(false);
    }
    selectingActivity = (id: string) => {
        this.selectedActivity = this.activityRegister.get(id);
    }
    cancelselectedActivity = () => {
        this.selectedActivity = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectingActivity(id) : this.cancelselectedActivity();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }
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

            console.log(error)
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
                if (this.selectedActivity?.id === id) { this.cancelselectedActivity() }
                this.loading = false;
            }
            )
        } catch (error) {
            console.log("error in deleting " + error)
        }
    }
}

