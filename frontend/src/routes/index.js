import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import { useContext } from 'react';
import UsernameContext from '../views/context/context';
// Check authentication status - Replace with your actual authentication logic

// const auth = false;

// Authentication routes
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// Main routes
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ServiceHistory = Loadable(lazy(() => import('views/utilities/ServiceHistory')));
const NewService = Loadable(lazy(() => import('views/utilities/NewService')));
const BookingHistory = Loadable(lazy(() => import('views/utilities/BookingHistory')));
const ManageBooking = Loadable(lazy(() => import('views/utilities/ManageBooking')));
const EditServices = Loadable(lazy(() => import('views/utilities/EditServices')));
const AddServices = Loadable(lazy(() => import('views/utilities/AddServices')));

// Combine both authentication and main routes

export default function ThemeRoutes() {
  const { auth } = useContext(UsernameContext);

  const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: <DashboardDefault />
          }
        ]
      },
      {
        path: '/',

        element: <DashboardDefault />
      },
      {
        path: 'utils',
        children: [
          {
            path: 'servicehistory',
            element: <ServiceHistory />
          },
          {
            path: 'new-service',
            element: <NewService />
          },
          {
            path: 'bookinghistory',
            element: <BookingHistory />
          },
          {
            path: 'managebooking',
            element: <ManageBooking />
          }
        ]
      },

      {
        path: 'manageservices',
        children: [
          {
            path: 'addservices',
            element: <AddServices />
          },
          {
            path: 'editservices',
            element: <EditServices />
          }
        ]
      }
    ]
  };

  const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: '/',
        element: <AuthLogin3 />
      },
      {
        path: '/pages/login/login3',
        element: <AuthLogin3 />
      },
      {
        path: '/pages/register/register3',
        element: <AuthRegister3 />
      }
    ]
  };
  const routes = auth ? [MainRoutes] : [AuthenticationRoutes];

  // Add a wildcard route to handle unmatched routes
  const NotFoundRoute = {
    path: '*',
    element: <Navigate to="/" replace />
  };

  routes[0].children.push(NotFoundRoute); // Assuming the main routes are at index 0

  return useRoutes(routes);
}
