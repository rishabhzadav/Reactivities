import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { activity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';


interface Props {
    activity: activity;
}
function ActivityDetails({ activity, }: Props) {

    const { activityStore } = useStore();
    const { openForm, cancelselectedActivity } = activityStore;
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
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelselectedActivity()} basic color='grey' content='Cancel' />
                </ButtonGroup>

            </Card.Content>
        </Card>


    )
}

export default observer(ActivityDetails)