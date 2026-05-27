import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PrivateRoute from './PrivateRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const CustomerPage = Loadable(lazy(() => import('pages/customer/CustomerPage')));
const CustomerFormPage = Loadable(lazy(() => import('pages/customer/CustomerFormPage')));
const UserList = Loadable(lazy(() => import('pages/users/UserList')));
const Placeholder = Loadable(lazy(() => import('pages/placeholder')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
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
        },
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'customers',
      element: <CustomerPage />
    },
    {
      path: 'customers/form',
      element: <CustomerFormPage />
    },
    {
      path: 'leases',
      element: <Placeholder title="Leases" />
    },
    {
      path: 'payment-points',
      element: <Placeholder title="Payment Points" />
    },
    {
      path: 'credit-controls',
      element: <Placeholder title="Credit Controls" />
    },
    {
      path: 'reports',
      element: <Placeholder title="Reports" />
    },
    {
      path: 'users',
      element: <UserList />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
