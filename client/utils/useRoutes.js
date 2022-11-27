import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage';
import { MainPage } from '../pages/MainPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { VerifyEmailPage } from '../pages/VerifyEmailPage';
import { LoginPage } from '../pages/LoginPage';


export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path='verify/:token' element={<VerifyEmailPage />} />
                </Routes>
            </>
        )
    } else {
        return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/resetPassword" element={<RecoverPasswordPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                
                <Route path='verify/:token' element={<VerifyEmailPage />} />
                
            </Routes>
        )
    }
}