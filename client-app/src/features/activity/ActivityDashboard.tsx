import React, { useEffect } from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { activity } from '../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './details/ActivityDetails';
import ActivityForm from './form/ActivityForm';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../app/layout/LoadingComponent';

// creating inerface to access the props in the desired format 
interface Props {
    //activities: activity[];
    // selectedActivity: activity | undefined;
    //selectActivity: (id: string) => void;
    // CreateOrEdit: (activity: activity) => void
    //DeleteActivity: (id: string) => void;
    // editMode: boolean;
    //FormOpen: (id?: string) => void;
    //FormClose: () => void;
    //submitting: boolean;
}
function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadingActivities, activityRegister } = activityStore;

    useEffect(() => {
        // agent.Actitivities.list().then(response => {
        // let activities: activity[] = [];
        // response.forEach((data) => {
        //   data.date = data.date.split("T")[0];
        //   activities.push(data);
        // })
        // setActivities(activities);
        // setLoading(false);
        if (activityRegister.size <= 1) {
            loadingActivities();
        }

        // }).catch(
        //   error => console.log(error)
        // )
    }, [loadingActivities, activityRegister.size]);


    if (activityStore.loadingInitial) {
        return <LoadingComponent content='loading app' />
    }

    return (
        <>
            <Grid>
                <GridColumn width={10}>
                    {/* <List>
                        {
                            activities.map((activity) => {
                                return (<List.Item key={activity.id}> {activity.title}</List.Item >)
                            })
                        }
                    </List> */}
                    <ActivityList />
                </GridColumn>
                {/* <GridColumn width={6}>
                    {
                        selectedActivity && !editMode &&
                        <ActivityDetails />
                    }
                    {editMode &&
                        <ActivityForm />}
                </GridColumn> */}

            </Grid>

        </>
    );
}

export default observer(ActivityDashboard)