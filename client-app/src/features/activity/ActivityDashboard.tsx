import React from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { activity } from '../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './details/ActivityDetails';
import ActivityForm from './form/ActivityForm';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

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
    const { selectedActivity, editMode } = activityStore;

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
                <GridColumn width={6}>
                    {
                        selectedActivity && !editMode &&
                        <ActivityDetails activity={selectedActivity} />
                    }
                    {editMode &&
                        <ActivityForm />}
                </GridColumn>

            </Grid>

        </>
    );
}

export default observer(ActivityDashboard)