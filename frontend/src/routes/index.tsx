import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Private = () => {
    const signed = useAuth();
    return signed ? <Home /> : <SignIn />;
}

const RoutesApp = () => {

    return (
 
            <Fragment>
                <Routes>
                    <Route path="/home" element={<Private />}/>
                    <Route path="/" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="*" element={<SignIn/>}/>
                </Routes>
            </Fragment>

    );
};

export default RoutesApp;
