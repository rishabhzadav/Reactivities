import React, { SyntheticEvent, useState } from "react";
import { activity } from "../../app/models/activity";
import { Button, Image, Item, Label, List, Segment } from "semantic-ui-react";
import ActivityDetails from "./details/ActivityDetails";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Link, NavLink } from "react-router-dom";


interface Props {
    // activities: activity[];
    //selectActivity: (id: string) => void;
    // cancelActivity: () => void;
    // DeleteActivity: (id: string) => void;
    //submitting: boolean;
}

function ActivityList() {

    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { activityByDate, DeleteActivity, loading } = activityStore;
    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        DeleteActivity(id);
    }
    return (
        <>
            <Segment >
                {/* <Image src={`assets/categoryImages/drinks.jpg`} alt="error" /> */}
                <Item.Group divided>
                    {
                        activityByDate.map((activity) => {
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
                                            <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                                            <Button name={activity.id}
                                                loading={loading && target === activity.id} onClick={(e) => handleDeleteActivity(e, activity.id)} floated="right" content="Delete" color="red" />
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

export default observer(ActivityList)