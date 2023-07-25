import React from "react";
import { activity } from "../../app/models/activity";
import { Button, Image, Item, Label, List, Segment } from "semantic-ui-react";
import ActivityDetails from "./details/ActivityDetails";


interface Props {
    activities: activity[];
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    DeleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, cancelActivity, DeleteActivity }: Props) {
    return (
        <>
            <Segment >
                <Item.Group divided>
                    {
                        activities.map((activity) => {
                            return (
                                <Item key={activity.id}>
                                    <Item.Content>
                                        <Item.Header as='a'>{activity.title}</Item.Header>
                                        <Item.Meta>{activity.date}</Item.Meta>
                                        <Item.Description>
                                            <div>{activity.description}</div>
                                            <div>{activity.city} , {activity.venue}</div>
                                        </Item.Description>
                                        <Item.Extra>
                                            {/* Always use callback function in onClick event as it is called only when the onclick event occur */}
                                            <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                            <Button onClick={() => DeleteActivity(activity.id)} floated="right" content="Delete" color="red" />
                                            <Label basic content={activity.category}></Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })
                    }
                </Item.Group>
            </Segment>



        </>

    );
}