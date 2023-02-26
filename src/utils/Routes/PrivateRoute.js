import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    return (
        !auth ? <Navigate to={'/login'} /> : children
    );
};

export default PrivateRoute;