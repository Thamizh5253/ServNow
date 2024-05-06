import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const DailyQuiz = Loadable(lazy(() => import('views/utilities/DailyQuiz')));
const ResultsTable = Loadable(lazy(() => import('views/utilities/ServiceHistory')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/NewService')));
const CreateQuiz = Loadable(lazy(() => import('views/utilities/CreateQuiz')));
const JoinQuizByCode = Loadable(lazy(() => import('views/utilities/EditServices')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
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
      path: 'utils',
      children: [
        {
          path: 'dailyquiz',
          element: <DailyQuiz />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'resultstable',
          element: <ResultsTable />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'customquiz',
      children: [
        {
          path: 'joinquiz',
          element: <JoinQuizByCode />
        }
      ]
    },
    {
      path: 'customquiz',
      children: [
        {
          path: 'newquiz',
          element: <CreateQuiz />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
