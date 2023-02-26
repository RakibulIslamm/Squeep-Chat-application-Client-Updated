import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PublicRoute = ({ children }) => {
    const auth = useAuth();
    return (
        auth ? <Navigate to={'/my-profile'} /> : children
    );
};

export default PublicRoute;