import axios from "axios";

const api = axios.create({
    baseURL: "https://sheetdb.io/api/v1/rc019fhlndvtf"
});

const userApi = "sqr506j3";
const passApi = "2oh8294aluk2qisht3r3";

const apiFunctions = {
    apiLogin: function(email, password, setPassword, navigate, setUser, loggerUser) {
        api.get(`/search?email=${email}`, {
            auth: {
                username: userApi,
                password: passApi,
            },
        }).then(response => {
            if(response.data.length === 0){
                alert("Email não cadastrado!! Faça o cadastro!");
                navigate(`/cadastro/${email}`);
            }
            else {
                response.data.map((person) => {
                    if(email === person.email && password === person.password){
                        alert("Usuário logado com sucesso!!");
                        setUser(loggerUser);
                        localStorage.setItem("user", JSON.stringify(loggerUser));
                        navigate("/");
                    }
                    else if(email === person.email && password !== person.password) {
                        alert("Senha Incorreta!!! Digite novamente!");
                        setPassword("");
                    }
                });
            }
        }).catch( err =>{
            alert("Erro no servidor " + err);
        });
    },

    apiRegister: function(email, setEmail, password, name, id, birthDate, telephone, navigate, setUser, loggerUser) {
        let dataBase = {
            name: name,
            email: email
        }
        api.get(`/search?email=${email}`, {
            auth: {
                username: userApi,
                password: passApi,
            }
        }).then(response => {
            if(response.data.length === 0) {
                api.post("", {
                    "data": {
                        "name": name,
                        "cpf": id,
                        "birth_date": birthDate,
                        "telephone": telephone,
                        "email": email,
                        "password": password,
                    }
                }, {
                    auth: {
                        username: userApi,
                        password: passApi,
                    }
                }).then(response => {
                    alert("Usuário cadastrado com sucesso!! Sejá Bem-Vindo!");
                    setUser(loggerUser);
                    localStorage.setItem("user", JSON.stringify(loggerUser));
                    navigate("/");
                    axios.post('/api/emailWelcome', dataBase).then(() => {
                        console.log("Mensagem enviada!");
                    }).catch(()=> {
                        console.log("Mensagem não enviada!");
                    });
                }).catch( err =>{
                    alert("Erro no servidor" + err);
                });
            }
            else {
                response.data.map((person) => {
                    if(email === person.email) {
                        alert(`O email ${email} já existe! Escolha outro ou faça login!`);
                        setEmail("");
                    }
                });
            }
        }).catch( err =>{
            alert("Erro no servidor" + err);
        });
    },

    apiForgotPassword: function(emailForgot, navigate) {
        const randomPass = Math.random().toString(36).slice(2);
        let dataBase2 = {
            email: emailForgot,
            newPass: randomPass
        }
        api.get(`/search?email=${emailForgot}`, {
            auth: {
                username: userApi,
                password: passApi,
            }
        }).then((response) => {
            if(response.data.length === 0) {
                alert("Email não cadastrado!! Faça o cadastro!");
                navigate(`/cadastro/${emailForgot}`);
            }
            else {
                api.patch(`/email/${emailForgot}`, {
                    data: {
                        "password": randomPass
                    }
                }, {
                    "auth": {
                        "username": userApi,
                        "password": passApi
                    }
                }).then(() => {
                    axios.post('/api/emailForgotPass', dataBase2).then(() =>{
                        console.log("Mensagem enviada!");
                    }).catch(() => {
                        console.log("Mensagem não enviada!");
                    });
                    alert(`Enviamos uma messagem para ${emailForgot}!! Acesse seu email!`);
                    navigate(`/login/${emailForgot}`);
                }).catch(err =>{
                    alert("Erro no servidor" + err);
                });
            }
        }).catch(err =>{
            alert("Erro no servidor" + err);
        });
    },

    apiDataUser: function(emailData, setDataUser, ageBirthDate) {
        api.get(`/search?email=${emailData}`, {
            auth: {
                username: userApi,
                password: passApi,
            },
        }).then(response => {
            setDataUser(response.data[0]);
            ageBirthDate(response.data[0].birth_date);
        }).catch(err => {
            alert("Erro no servidor" + err);
        });
    }, 

    apiDataVaccine: function(setDataVaccines) {
        api.get("?sheet=Página2", {
            auth: {
                username: userApi,
                password: passApi,
            },
        }).then(response => {
            setDataVaccines(response.data);
        }).catch(err => {
            alert("Erro no servidor" + err);
        });
    },

    apiVaccineRegistration: function(dataBase7, setVaccine, setDateOfVaccination) {
        api.get("?sheet=Página3", {
            auth: {
                username: userApi,
                password: passApi,
            },
        }).then(response => {
            response.data.map((immunizeds) => {
                if(dataBase7.email === immunizeds.immunized && dataBase7.vaccine === immunizeds.vaccine) {
                    alert("O usuário já tomou a vacina!!!");
                    setVaccine("");
                }
                else {
                    api.post("?sheet=Página3", {
                        "data" : {
                            "immunized": dataBase7.email,
                            "vaccine": dataBase7.vaccine,
                            "date_of_vaccination": dataBase7.date_of_vaccination,
                        }
                    }, {
                        auth: {
                            username: userApi,
                            password: passApi,
                        }
                    }).then(() => {
                        alert("Vacina cadastrada com sucesso!!!");
                        setVaccine("");
                        setDateOfVaccination("");
                    }).catch(err => {
                        alert("Erro no servidor" + err);
                    });
                }
            });
        }).catch(err => {
            alert("Erro no servidor" + err);
        });
    }
}

export default apiFunctions;
