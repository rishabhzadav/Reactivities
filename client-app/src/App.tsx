import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { error } from 'console';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(activity => {
      setActivities(activity.data);
    }).catch(
      error => console.log(error)
    )
  }, []);

  return (
    <>

      <Header as="h3" icon="users" content="Reactivities" />
      <List>
        {
          activities.map((activity: any) => {
            return (<List.Item key={activity.name}> {activity.title}</List.Item >)
          })
        }
      </List>
    </>
  );
}

export default App;
