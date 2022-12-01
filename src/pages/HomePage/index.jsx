import React from "react";
import { Link } from "react-router-dom";
import caderneta from "../../assets/cadernetaVacina.png";
import marcacao from "../../assets/marcacaoConsulta.png";
import natal from "../../assets/preNatal.png";
import "./styles.css";
import Header from "../../components/Header";
import CopyRight from "../../components/CopyRight";

function HomePage() {
    return (
        <div>
            <Header />
            <div className="containerHome">
                <div className="item">
                    <Link style={{ textDecoration: 'none' }} to="/caderneta-de-vacinacao">
                        <img src={caderneta} alt="caderneta"/>
                        <p>Caderneta de vacinação</p>
                    </Link>
                </div>
                <div className="item">
                    <Link style={{ textDecoration: 'none' }} to="/pre-natal">
                        <img src={natal} alt="pre-natal"/>  
                        <p>Pré-Natal</p>
                    </Link>
                </div>
                <div className="item">
                    <Link style={{ textDecoration: 'none' }} to="/marcacao-de-consultas">
                        <img src={marcacao} alt="consulta"/>  
                        <p>Marcação de Consulta</p>
                    </Link>
                </div>
            </div>
            <CopyRight />
        </div> 
    );
}

export default HomePage;