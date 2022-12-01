import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import apiFunctions from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const logger = localStorage.getItem("user");
    let loggerUser = null;

    useEffect(() =>{
        setTimeout(() => {
            const recoveredUser = localStorage.getItem("user");
            if(recoveredUser) {
                setUser(JSON.parse(recoveredUser));
            }
            setLoading(false);
        }, 3000);
    }, []);

    function register(email, password, name, id, birthDate, telephone, setEmail) {
        loggerUser = email;
        const dataBase3 = {
            name: name,
            id: id,
            email: email,
            password: password,
            birthDate: birthDate,
            telephone: telephone
        }
        if(!email || !password || !name || !id || !birthDate || !telephone){
            alert("Preencha todos os campos para cadastro!!!");
        }
        else if(email && password && name && id && birthDate && telephone) {
            axios.post('/api/register', dataBase3).then((response) => {
                if(response.data.id === 0) {
                    console.log(response.data.msg);
                    apiFunctions.apiRegister(email, setEmail, password, name, id, birthDate, telephone, navigate, setUser, loggerUser);
                }
                else if(response.data.id === 1) {
                    alert(response.data.msg);
                }
                else if(response.data.id === 2) {
                    alert(response.data.msg);
                    setUser(loggerUser);
                    localStorage.setItem("user", JSON.stringify(loggerUser));
                    navigate("/");
                }
                else if(response.data.id === 3) {
                    alert(response.data.msg);
                    setEmail("");
                }
            })
        }
    }

    function login(email, password, setPassword) {
        loggerUser = email;
        const dataBase4 = {
            email: email,
            password: password
        }

        if(email === "" || password === "") {
            alert("Preencha todos os campos para login!!!");
        }
        else if(email !== "" && password !== "") {
            axios.post('/api/login', dataBase4).then((response) => {
                if(response.data.id === 0) {
                    console.log(response.data.msg);
                    apiFunctions.apiLogin(email, password, setPassword, navigate, setUser, loggerUser);
                }
                else if(response.data.id === 1) {
                    alert(response.data.msg);
                    setUser(loggerUser);
                    localStorage.setItem("user", JSON.stringify(loggerUser));
                    navigate("/");
                }
                else if(response.data.id === 2) {
                    alert(response.data.msg);
                    setPassword("");
                }
                else if(response.data.id === 3){
                    alert(response.data.msg);
                    navigate(`/cadastro/${email}`);
                }
            })
        }
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    function forgotPassword(emailForgot) {
        const dataBase5 = {
            emailForgot: emailForgot
        }

        if(!emailForgot) {
            alert("Preencha todos os campos!!!");
        }
        else {
            
            axios.post('/api/emailPassForgot', dataBase5).then((response) => {
                if(response.data.id === 0) {
                    console.log(response.data.msg);
                    apiFunctions.apiForgotPassword(emailForgot, navigate);
                }
                else if(response.data.id === 1) {
                    alert(response.data.msg);
                    navigate(`/cadastro/${emailForgot}`);
                }
                else if(response.data.id === 2) {
                    alert(response.data.msg);
                }
                else if(response.data.id === 3) {
                    alert(response.data.msg);
                    navigate(`/login/${emailForgot}`);
                }
            })
        }
    }

    return (
        <AuthContext.Provider value={{authenticated: Boolean(user), user, loading, login, logout, register, logger, forgotPassword}}>
            {children}
        </AuthContext.Provider>
    );
}