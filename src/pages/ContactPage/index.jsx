import React from "react";
import CopyRight from "../../components/CopyRight";
import Form from "../../components/Form";
import Header from "../../components/Header";
import SocialMediaIcon from "../../components/SocialMediaIcon";
import "./styles.css";

function ContactPage() {
    return (
        <div>
            <Header />
            <div className="contact">
                <h1>Contato</h1>
                <p>
                    Entre em contato para tirar dúvidas, utilizar nossos serviços. <br />
                    Aguarde nosso contato, retornaremos o mais breve possível por email!
                </p>
            </div>
            <Form />
            <SocialMediaIcon />
            <CopyRight />
        </div>
    )
}

export default ContactPage;