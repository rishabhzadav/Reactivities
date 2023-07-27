import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { error } from 'console';
import { Container, Header, List } from 'semantic-ui-react';
import { activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Actitivities.list().then(response => {
      let activities: activity[] = [];
      response.forEach((data) => {
        data.date = data.date.split("T")[0];
        activities.push(data);
      })
      setActivities(activities);
      setLoading(false);
    }).catch(
      error => console.log(error)
    )
  }, []);


  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEdit(activity: activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Actitivities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Actitivities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }]);
    // setSelectedActivity(activity);
    // setEditMode(false);
    // console.log(activities);
  }
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Actitivities.delete(id).then(() => {
      setActivities(activities.filter(x => x.id !== id));
      setSubmitting(false);
    })
  }

  if (loading) {
    return <LoadingComponent content='loading app' />
  }
  return (
    <>
      <NavBar FormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectedActivity}
          cancelActivity={cancelSelectedActivity}
          editMode={editMode} FormOpen={handleFormOpen} FormClose={handleFormClose}
          CreateOrEdit={handleCreateOrEdit}
          DeleteActivity={handleDeleteActivity} submitting={Submitting} />
      </Container>

    </>
  );
}

export default App;
