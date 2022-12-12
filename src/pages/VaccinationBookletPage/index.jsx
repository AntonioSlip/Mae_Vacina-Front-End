import React, { useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import CopyRight from "../../components/CopyRight";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import apiFunctions from "../../services/api";
import post_image from "../../assets/post_image.png";

function VaccinationBookletPage() {
    const { logger } = useContext(AuthContext);
    const [ dataUser, setDataUser ] = useState("");
    const [ birthDate, setBirthDate ] = useState("");
    const [ age, setAge ] = useState("");
    const [ vaccine, setVaccine ] = useState("");
    const [ dateOfVaccination, setDateOfVaccination ] = useState("");
    const [ dataVaccination, setDataVaccination ] = useState("");
    const [ datavaccines, setDataVaccines ] = useState([]);                                  
    const dataBase6 = {
        logger: logger
    } 
    const dataBase7 = {
        email: dataUser.email,
        vaccine: vaccine,
        date_of_vaccination: dateOfVaccination
    }
    const dataBase8 = {
        email: dataUser.email
    }

    function ageBirthDate (data) {
        let dateAmerican = data.substring(0,10);
        let dateBrazilian = dateAmerican.split('-').reverse().join('/');
        setBirthDate(dateBrazilian);
        let currentDay = new Date().getDate();
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        let birthDateArray = dateBrazilian.split("/");
        let birthDay = birthDateArray[0];
        let birthMonth = birthDateArray[1];
        let birthYear = birthDateArray[2];
        let currentAge = currentYear - birthYear;
        //Se mês atual for menor que o mês de nascimento, não fez aniversário ainda.
        if(currentMonth < birthMonth) {
            currentAge--;
        }
        else {
            //Se mês atual for igual ao mês de nascimento, verificar o dia.
            if(currentMonth === birthMonth) {
                //Se o dia atual for menor que o dia de nascimento, não fez aniversário ainda.
                if(currentDay < birthDay) {
                    currentAge--;
                }
            }
        }
        setAge(currentAge);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(vaccine && dateOfVaccination) {
            axios.post('/api/vaccineRegistration', dataBase7).then((response) => {
                if(response.data.id === 0) {
                    console.log(response.data.msg);
                    apiFunctions.apiVaccineRegistration(dataBase7, setVaccine, setDateOfVaccination);
                }
                else if(response.data.id === 1) {
                    alert(response.data.msg);
                    setVaccine("");
                }
                else if(response.data.id === 2) {
                    alert(response.data.msg);
                }
                else if(response.data.id === 3) {
                    alert(response.data.msg);
                    setVaccine("");
                    setDateOfVaccination("");
                }
            }).catch((err) => {
                alert(err);
            });
        }
        else {
            alert("Preencha todos os campos!!!");
        }
    }

    useEffect(() => {
        axios.post('/api/dataUser', dataBase6).then((response) => {
            if(response.data.id === 0) {
                console.log(response.data.msg);
                apiFunctions.apiDataUser(response.data.emailData, setDataUser, ageBirthDate);
            }
            else if(response.data.id === 1) {
                setDataUser(response.data.dataUser);
                ageBirthDate(response.data.dataUser.birth_date);
            }
        }).catch((err) => {
            alert(err);
        });
    }, [])

    useEffect(() => {
        axios.post('/api/dataVaccine').then((response) => {
            if(response.data.id === 0) {
                console.log(response.data.msg);
                apiFunctions.apiDataVaccine(setDataVaccines);
            }
            else if(response.data.id === 1) {
                setDataVaccines(response.data.dataVaccine);
            }
        }).catch((err) => {
            alert(err);
        });

        if(dataUser.email) {
            axios.post('/api/dataVaccination', dataBase8).then((response) => {
                if(response.data.id === 0) {
                    console.log(response.data.msg);
                    apiFunctions.apiDataVaccination(dataBase8);
                }
                else if(response.data.id === 1) {
                    setDataVaccination(response.data.dataVaccination);
                }
                else if(response.data.id === 2) {
                    //console.log(response.data.msg);
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }, [dataUser.email, dataVaccination ,handleSubmit]);

    return (
        <div>
            <Header />

            <article className="card">
                <div className="card__publication">
                    <img src={post_image} alt=""/>
                    <div>
                        <span className="card__author">
                            <i className="ri-user-line"></i> Dados do Cliente
                        </span>
                        <span className="card__date">
                            <i className="ri-calendar-line"></i> Nome: {dataUser.name}
                        </span>
                        <span className="card__date">
                            <i className="ri-calendar-line"></i>CPF: {dataUser.cpf}
                        </span>
                        <span className="card__date">
                            <i className="ri-user-line"></i> Data de Nasicmento: {birthDate}
                        </span>
                        <span className="card__date">
                            <i className="ri-calendar-line"></i> Idade: {age}
                        </span>
                        <span className="card__date">
                            <i className="ri-user-line"></i> Telefone: {dataUser.telephone}
                        </span>
                        <span className="card__date">
                            <i className="ri-calendar-line"></i> Email: {dataUser.email}
                        </span>
                    </div>
                </div>
                <div className="card__info">
                    <h1>Registro das Vacinas</h1>
                    {dataVaccination.length > 0 
                    ? 
                    <ul className="booklet">
                    {dataVaccination.map((vaccine) => (
                        <li key={vaccine.id}>
                            <h2 className="card__title">{vaccine.vaccine}</h2>
                            <span className="card__subtitle">{vaccine.date_of_vaccination.substring(0,10).split('-').reverse().join('/')}</span>
                        </li>
                    ))}
                    </ul>
                    :
                    <div className="noVaccine">
                        <h1>Não há vacinas cadastradas</h1> 
                    </div>
                    }
                    <p className="card__description">
                    </p>
                </div>
            </article>

            <div className="containerBorder">
                <h1>Cadastrar Vacinas</h1>
                <form className="control" onSubmit={handleSubmit}>
                    <label htmlFor="vaccine">Vacina:</label>
                    <select id="vaccine" name="vaccine" value={vaccine} onChange={(e) => setVaccine(e.target.value)} required >
                        <option value="">Selecione</option>
                        {datavaccines.map((vaccines) => {
                            return <option key={vaccines.vaccine} value={vaccines.vaccine}>{vaccines.vaccine}</option>
                        })}
                    </select>
                    <label>Data da Vacinação:</label>
                    <input type="date" name="date" value={dateOfVaccination} onChange={(e) => setDateOfVaccination(e.target.value)} required />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>        
            
            <CopyRight />
        </div>
    )
}

export default VaccinationBookletPage;