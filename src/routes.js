import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Booking from './pages/Booking';
import NotFound from './pages/Page404';
import AllBookings from './pages/AllBookings';
import AddMoney from './pages/addMoney';
import Wallet from './pages/wallet';

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'booking', element: <Booking /> },
      ]
    },
    {
      path: '/bookings',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <AllBookings /> }
      ]
    },
    {
      path: '/wallet',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Wallet /> },
        { path: 'addMoney', element: <AddMoney /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
