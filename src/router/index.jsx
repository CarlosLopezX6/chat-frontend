import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Auth } from '../Layout/Auth';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import { ChatPage } from '../pages/ChatPage';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const router = createBrowserRouter([

    {
        path: '/auth',
        element: (
            <PublicRoute>
                <Auth />
            </PublicRoute>
        ),
        children: [
            {                             
                path: 'login',
                element: <LoginPage />,
            },
            {                             
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: '*',                              //Si ponen otra cosa que no sea las rutas hijas
                element: <Navigate to="/auth/login" replace={ true } />
            },
            {
                path: '',                               //Que dejen vacio tipo   host/auth/
                element: <Navigate to="/auth/login" replace={ true } />
            },
        ]
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <ChatPage />
            </PrivateRoute>
        )
    },
    {
        path: '*',
        element: <Navigate to="/" replace={ true } />
    }
]);
