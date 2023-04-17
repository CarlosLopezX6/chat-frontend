import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {

    const { auth } = useContext(AuthContext);
        
    return auth.logged
        ? children
        : <Navigate to="auth/login" />
}