import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { activity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

// interface Props {
//     // activity: activity | undefined;
//     // FormClose: () => void;
//    // CreateOrEdit: (activity: activity) => void;
//    // submitting: boolean;
// }

function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore

    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: ""
    }

    //const [myvalue, setValue] = useState(initialState);
    //console.log(` myvalue is ${myvalue.category}`);

    const [activity, setActivity] = useState<activity>(initialState);

    console.log(`initial state is ${initialState.category}`);

    // useEffect(() => {
    //     setActivity(initialState);
    // }, [])
    //setActivity(initialState);
    console.log(`activity state is ${activity.category}`);
    // console.log(activity.category);
    function handleSubmit() {
        // console.log(activity);
        console.log("my id is " + activity.id)
        activity.id === "" ? createActivity(activity) : updateActivity(activity)

    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <>
            {/* clearing tag clear all the css value  */}
            <Segment clearing  >
                <Form onSubmit={() => handleSubmit()} autoComplete="off">
                    <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange} />
                    <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
                    <Form.Input placeholder="Catergory" value={activity.category} name='category' onChange={handleInputChange} />
                    <Form.Input type="date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange} />
                    <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange} />
                    <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange} />
                    <Button loading={loading} floated="right" positive content='Submit' type="submit" />
                    <Button onClick={() => closeForm()} floated="right" content='Cancel' />
                </Form>
            </Segment>
        </>

    );
}

export default observer(ActivityForm)