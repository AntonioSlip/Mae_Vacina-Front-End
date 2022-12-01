import React from "react";
import preNatal from "../../assets/preNatal1.png";
import "./styles.css";
import Header from "../../components/Header";
import CopyRight from "../../components/CopyRight";

function PreNatalPage() {
    return (
        <div>
            <Header />
            <button>Vacinas</button> <br />
            <button>Exames</button> <br />
            <button>Agendamentos/Consultas</button> <br />
            <img src={preNatal} alt="natal"/>
            <CopyRight />
        </div>
    )
}

export default PreNatalPage;