import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { error } from 'console';
import { Container, Header, List } from 'semantic-ui-react';
import { activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {

  const [activities, setActivities] = useState<activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<activity[]>("http://localhost:5000/api/activities").then(activity => {
      setActivities(activity.data);
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
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }]);
    setSelectedActivity(activity);
    setEditMode(false);
    console.log(activities);
  }
  function handleDeleteActivity(id : string) {
    setActivities(activities.filter(x => x.id !== id));
  }
  return (
    <>

      {/* <Header as="h3" icon="users" content="Reactivities" /> */}
      <NavBar FormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectedActivity}
          cancelActivity={cancelSelectedActivity}
          editMode={editMode} FormOpen={handleFormOpen} FormClose={handleFormClose}
          CreateOrEdit={handleCreateOrEdit}
          DeleteActivity={handleDeleteActivity} />
      </Container>

    </>
  );
}

export default App;
