import React from "react";
import Header from "../../components/Header";
import SocialMediaIcon from "../../components/SocialMediaIcon";
import imagem1 from "../../assets/img1.png";
import imagem2 from "../../assets/img2.png";
import "./styles.css";
import CopyRight from "../../components/CopyRight";

function AboutPage() {
    return (
        <div>
            <Header />
            <div className="about">
                <h1>Sobre o Mãe-Vacina</h1>
                <p> 
                    Somos uma equipe voltada para a saúde ,levando tecnologia e eficiência para as pessoas. <br />
                    Estamos aqui para simplificar a sua vida: <br />
                    Utilizando das ferramentas da caderneta de vacina digital, onde o atendimento é todo feito pelo aplicativo.
                </p>
                <img src={imagem1} alt="img1" />
                <img src={imagem2} alt="img2"/>
            </div>
            <SocialMediaIcon />
            <CopyRight />
        </div>
    )
}

export default AboutPage;