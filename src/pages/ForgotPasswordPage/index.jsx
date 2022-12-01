import React from "react";
import LayoutComponents from "../../components/LayoutComponents";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";


function ForgotPasswordPage() {
    const [emailForgot, setEmailForgot] = useState("");
    const { forgotPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        forgotPassword(emailForgot);
    }

    function handleCancel() {
        navigate("/login");
    }
    return (
        <>
            <LayoutComponents>
                <form className="login-form" onSubmit={handleSubmit}>
                        <span className="login-form-title">Recuperar Senha</span>
                        <span className="login-form-title">
                            <img src={logo} alt="logo"/>
                        </span>
                        <div className="wrap-input">
                            <input className={emailForgot !== "" ? "has-val input" : "input"} type="email" name="email" id="email" value={emailForgot} onChange={(event) => setEmailForgot(event.target.value)} required />
                            <span className="focus-input" data-placeholder="Email"></span>
                        </div>
                        <div className="container-login-form-btn">
                            <button className="login-form-btn1" type="submit">Enviar</button>
                        </div>
                    </form>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn2" onClick={handleCancel}>Cancelar</button>
                    </div>
            </LayoutComponents>
        </>
    )
}

export default ForgotPasswordPage;