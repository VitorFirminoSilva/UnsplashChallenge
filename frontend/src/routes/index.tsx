import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUser from '../pages/Main/CreateUser';
import Home from '../pages/Main/Home';
import NotFoundPage from '../pages/Main/NotFoundPage';
import SignIn from '../pages/Main/SignIn';

const MyRoute: React.FC = () => {
    document.title =  "Unsplash App";
    return (
        <Routes>
            <Route
                path="/"
                element={ <Home /> }
            />
            <Route
                path="signin"
                element={ <SignIn /> }
            />
            <Route
                path="createnew"
                element={ <CreateUser /> }
            />

            <Route
                path="*"
                element = { <NotFoundPage /> }
            />
        </Routes>
    );

};

export default MyRoute;