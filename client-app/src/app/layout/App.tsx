import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { loadavg } from 'os';
import Home from '../../features/Homes/Home';

function App() {

  const [activities, setActivities] = useState<activity[]>([]);
  
  //const [selectedActivity, setSelectedActivity] = useState<activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  //const [Submitting, setSubmitting] = useState(false);
  const { activityStore } = useStore();


 

  // function handleSelectedActivity(id: string) {
  //   setSelectedActivity(activities.find(x => x.id === id));
  // }

  // function cancelSelectedActivity() {
  //   // setSelectedActivity(undefined);
  //   activityStore.selectedActivity = undefined;
  // }

  // function handleFormOpen(id?: string) {
  //   id ? handleSelectedActivity(id) : cancelSelectedActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose() {
  //   setEditMode(false);
  // }
  // function handleCreateOrEdit(activity: activity) {
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Actitivities.update(activity).then(() => {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }
  //   else {
  //     activity.id = uuid();
  //     agent.Actitivities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }
  //   // activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }]);
  //   // setSelectedActivity(activity);
  //   // setEditMode(false);
  //   // console.log(activities);
  // }
  // function handleDeleteActivity(id: string) {
  //   setSubmitting(true);
  //   agent.Actitivities.delete(id).then(() => {
  //     setActivities(activities.filter(x => x.id !== id));
  //     setSubmitting(false);
  //   })
  // }
  let location = useLocation();
  if(location.pathname === "/")
  {
      return (
        <>
          <Home/>
        </>
      )
  }
  else{
    return (
      <>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          {/* <h1> {activityStore.title}</h1>
          <Button content='click to add !' onClick={activityStore.setTitle} /> */}
          {/* <ActivityDashboard /> */}
          {/*this help in redering child element*/}
          <Outlet />
        </Container>
  
      </>
    );
  }
  
}
// we add app component in observer so that it can track the all the state of all changes
export default observer(App);
