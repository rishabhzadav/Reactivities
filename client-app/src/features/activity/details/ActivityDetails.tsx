import React, { useEffect } from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { activity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { NavLink, useParams } from 'react-router-dom';



function ActivityDetails() {

    const { activityStore, } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();



    useEffect(() => {

        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity]);

    if (!activity || loadingInitial) return <LoadingComponent />
    {
        console.log(activity.category)
    }
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} alt="error" />
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
                    <Button as={NavLink} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
                    <Button as={NavLink} to={'/activities'} basic color='grey' content='Cancel' />
                </ButtonGroup>

            </Card.Content>
        </Card>


    )
}

export default observer(ActivityDetails)