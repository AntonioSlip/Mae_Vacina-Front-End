import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../contexts/auth";
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import RegisterPage from "../pages/RegisterPage";
import VaccinationBookletPage from "../pages/VaccinationBookletPage";
import PreNatalPage from "../pages/PreNatalPage";
import AppointmentBookingPage from "../pages/AppointmentBookingPage";
import ContactPage from "../pages/ContactPage";
import Loading from "../components/Loading";
import AboutPage from "../pages/AboutPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

function AppRoutes() {
    function Private({children}) {
        const { authenticated, loading } = useContext(AuthContext);
        if(loading) {
            return <Loading />;
        }
        else if(!authenticated) {
            return <Navigate to="/login" />;
        }
        else {
            return children;
        }
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/login/:emailForgotPassword" element={ <LoginPage /> } />
                    <Route path="/cadastro" element={ <RegisterPage /> } />
                    <Route path="/cadastro/:emailNoRegister" element={ <RegisterPage /> } />
                    <Route path="/esqueceu-a-senha" element={ <ForgotPasswordPage /> }/>
                    <Route path="/" element={ <Private> <HomePage /> </Private> } />
                    <Route path="/caderneta-de-vacinacao" element={ <Private> <VaccinationBookletPage /> </Private> }/>
                    <Route path="/pre-natal" element={ <Private> <PreNatalPage /> </Private> } />
                    <Route path="/marcacao-de-consultas" element={ <Private> <AppointmentBookingPage /> </Private> } />
                    <Route path="/contato" element={ <Private> <ContactPage /> </Private> } />
                    <Route path="/sobre" element={ <Private> <AboutPage /> </Private> } />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;