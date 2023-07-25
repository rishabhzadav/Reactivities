import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { activity } from "../../../app/models/activity";

interface Props {
    activity: activity | undefined;
    FormClose: () => void;
    CreateOrEdit : (activity : activity) => void;
}
export default function ActivityForm({ activity: selectedActivity, FormClose , CreateOrEdit }: Props) {

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
       CreateOrEdit(activity);

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
                    <Form.Input placeholder="Date" value={activity.date} name='date' onChange={handleInputChange} />
                    <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange} />
                    <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange} />
                    <Button floated="right" positive content='Submit' type="submit" />
                    <Button onClick={() => FormClose()} floated="right" content='Cancel' />
                </Form>
            </Segment>
        </>

    );
}