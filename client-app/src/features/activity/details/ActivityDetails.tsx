import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { activity } from '../../../app/models/activity';


interface Props {
    activity: activity;
    cancelActivity: () => void;
    FormOpen: (id?: string) => void;
    FormClose: () => void;
}
export default function ActivityDetails({ activity, cancelActivity, FormOpen, FormClose }: Props) {
    return (
        <Card fluid>
            <Image src={`assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup>
                    <Button onClick={() => FormOpen(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelActivity()} basic color='grey' content='Cancel' />
                </ButtonGroup>

            </Card.Content>
        </Card>


    )
}