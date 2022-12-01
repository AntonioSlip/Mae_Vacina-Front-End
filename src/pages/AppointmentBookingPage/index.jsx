import React from "react";
import consulta from "../../assets/marcacaoConsulta1.png";
import CopyRight from "../../components/CopyRight";
import Header from "../../components/Header";

function AppointmentBookingPage() {
    return (
        <div>
            <Header />
            <button>Agendar Consultas</button> <br />
            <button>Agendar Exames</button> <br />
            <img src={consulta} alt="marcação"/>
            <CopyRight />
        </div>
    )
}

export default AppointmentBookingPage;