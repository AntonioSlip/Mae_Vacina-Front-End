import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import logo from "../../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutComponents from "../../components/LayoutComponents";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { emailForgotPassword } = useParams();

    useEffect(() => {
        if(emailForgotPassword){
            setEmail(emailForgotPassword)
        }
    }, [emailForgotPassword]);

    function handleSubmit(event) {
        event.preventDefault();
        login(email, password, setPassword);
    }
    
    function handleRegister() {
        navigate("/cadastro");
    }

    return (
        <> 
            <LayoutComponents>
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title">Mãe-Vacina</span>
                    <span className="login-form-title">
                        <img src={logo} alt="logo"/>
                    </span>
                    <div className="wrap-input">
                        <input className={email !== "" ? "has-val input" : "input"} type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                        <span className="focus-input" data-placeholder="Email"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={password !== "" ? "has-val input" : "input"} type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                        <span className="focus-input" data-placeholder="Senha"></span>
                    </div>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn1" type="submit">Entrar</button>
                    </div>
                </form>
                <div className="container-login-form-btn">
                    <button className="login-form-btn2" onClick={handleRegister}>Cadastre-se</button>
                </div>
                <div className="text-center">
                    <Link style={{ textDecoration: 'none' }} to="/esqueceu-a-senha">
                        <span className="txt1">Esqueceu a senha?</span>
                    </Link>
                </div>
            </LayoutComponents>       
        </>
    );
}

export default LoginPage;