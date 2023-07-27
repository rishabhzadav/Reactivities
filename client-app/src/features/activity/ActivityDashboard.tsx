import React from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { activity } from '../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './details/ActivityDetails';
import ActivityForm from './form/ActivityForm';

// creating inerface to access the props in the desired format 
interface Props {
    activities: activity[];
    selectedActivity: activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    CreateOrEdit: (activity: activity) => void
    DeleteActivity: (id: string) => void;
    editMode: boolean;
    FormOpen: (id?: string) => void;
    FormClose: () => void;
    submitting : boolean;
}
export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelActivity, CreateOrEdit, DeleteActivity, 
    editMode, FormOpen, FormClose , submitting }: Props) {


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
                    <ActivityList activities={activities} selectActivity={selectActivity} cancelActivity={cancelActivity}
                        DeleteActivity={DeleteActivity} submitting ={submitting}/>
                </GridColumn>
                <GridColumn width={6}>
                    {
                        selectedActivity && !editMode &&
                        <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} FormOpen={FormOpen} FormClose={FormClose} />
                    }
                    {editMode &&
                        <ActivityForm activity={selectedActivity} FormClose={FormClose} CreateOrEdit={CreateOrEdit} submitting = {submitting} />}
                </GridColumn>

            </Grid>

        </>
    );
}