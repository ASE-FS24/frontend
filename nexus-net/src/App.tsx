import React from 'react';
import './App.css';
import Home from "./app/Pages/MainPage";
import {BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Register from "./app/Pages/RegisterPage";
import ConfirmSignUp from "./app/Pages/ConfirmSignUpPage";

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
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
