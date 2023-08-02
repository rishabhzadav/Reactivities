import { createBrowserRouter, RouteObject } from 'react-router-dom'
import ActivityDashboard from '../../features/activity/ActivityDashboard'
import App from '../layout/App'
import Home from '../../features/Homes/Home'
import ActivityForm from '../../features/activity/form/ActivityForm'
import ActivityDetails from '../../features/activity/details/ActivityDetails'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/activities',
                element: <ActivityDashboard />
            },
            {
                path: '/activities/:id',
                element: <ActivityDetails />
            },
            {
                path: '/createActivity',
                element: <ActivityForm key='create' />
            },
            {
                path: 'manage/:id',
                element: <ActivityForm key='manage' />
            }
        ]

    }
]

export const router = createBrowserRouter(routes)