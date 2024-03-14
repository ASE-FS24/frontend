import React from 'react';
import './App.css';
import Home from "./app/Pages/MainPage";
import {BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Register from "./app/Pages/RegisterPage";
import ConfirmSignUp from "./app/Pages/ConfirmSignUpPage";
import Login from "./app/Pages/LoginPage";
import ProfilePage from "./app/Pages/ProfilePage";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
