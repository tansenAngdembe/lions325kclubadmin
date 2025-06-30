import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './components/AuthContext';

// Placeholder pages
const ClubInfo = () => <div className="p-6 text-xl">Club Info Page</div>;
const ClubMembers = () => <div className="p-6 text-xl">Dashboard</div>;
const OtherInfo = () => <div className="p-6 text-xl">Other Info Page</div>;

const AppRouter = () => {
  const { isLoggedIn, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/login',
      element: isLoggedIn ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/',
      element: isLoggedIn ? <Layout onLogout={logout} /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element:<ClubMembers />,
        },
        {
          path: 'club-info',
          element: <ClubInfo />,
        },
        {
          path: 'club-members',
          element:  <Dashboard />,
        },
        {
          path: 'other-info',
          element: <OtherInfo />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={isLoggedIn ? '/' : '/login'} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
