import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../service/LoginService';

function PrivateRoutes() {
    const user = getUser();

    const isTokenValid = (token) => {
        //TODO: Validate token logic here..
        return user && user.token;
    }
    return (
        (user && user.token && isTokenValid(user.token)) ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutes;