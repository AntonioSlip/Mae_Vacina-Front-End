import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import LayoutComponents from "../../components/LayoutComponents";

function RegisterPage() {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [birthDate, setBirthDate] = useState("2022-02-22");
    const [telephone, setTelephone] = useState("");
    const navigate = useNavigate();
    const {emailNoRegister} = useParams();

    useEffect(() =>{
        if(emailNoRegister) {
            setEmail(emailNoRegister);
        }
    }, [emailNoRegister]);

    function handleSubmit(event) {
        event.preventDefault();
        register(email, password, name, id, birthDate, telephone, setEmail);
    }

    function handleCancel() {
        navigate("/login");
    }

    return(
        <>
            <LayoutComponents>
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title">Cadastro</span>
                    <span className="login-form-title">
                        <img src={logo} alt="logo"/>
                    </span>
                    <div className="wrap-input">
                        <input className={name !== "" ? "has-val input" : "input"} type="text" name="text" id="text" value={name} onChange={(event) => setName(event.target.value)} required />
                        <span className="focus-input" data-placeholder="Nome"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={id !== "" ? "has-val input" : "input"} type="text" name="number" id="number" value={id} onChange={(event) => setId(event.target.value)} required />
                        <span className="focus-input" data-placeholder="CPF"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={birthDate !== "" ? "has-val input" : "input"} type="date" name="date" id="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} required />
                        <span className="focus-input" data-placeholder="Data de Nascimento"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={telephone !== "" ? "has-val input" : "input"} type="tel" name="tel" id="tel" value={telephone} onChange={(event) => setTelephone(event.target.value)} pattern="[0-9]{11}" required />
                        <span className="focus-input" data-placeholder="Telefone"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={email !== "" ? "has-val input" : "input"} type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                        <span className="focus-input" data-placeholder="Email"></span>
                    </div>
                    <div className="wrap-input">
                        <input className={password !== "" ? "has-val input" : "input"} type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                        <span className="focus-input" data-placeholder="Senha"></span>
                    </div>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn1" type="submit">Finalizar Cadastro</button>
                    </div>
                </form>
                <div className="container-login-form-btn">
                    <button className="login-form-btn2" onClick={handleCancel}>Cancelar</button>
                </div>
            </LayoutComponents>
        </>
    )
}

export default RegisterPage;