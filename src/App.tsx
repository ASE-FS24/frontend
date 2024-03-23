import React from 'react';
import Home from "./app/Pages/MainPage";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Register from "./app/Pages/RegisterPage";
import ConfirmSignUp from "./app/Pages/ConfirmSignUpPage";
import Login from "./app/Pages/LoginPage";
import ProfilePage from "./app/Pages/ProfilePage";
import styled from "styled-components";

const StyledMain = styled.main`
  background: center no-repeat url("/background.jpg");
  background-size: cover;
  height: 100vh;
`;

function App() {
    return (
        <BrowserRouter>
            <StyledMain>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/confirm-sign-up" element={<ConfirmSignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>
            </StyledMain>
        </BrowserRouter>
    );
}

export default App;
