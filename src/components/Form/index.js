import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";

class Form extends Component {

    state = {
        name1: '',
        lastName: '',
        email: '',
        message: '',
        sent: false
    }

    //handle inputs
    handleName1 = (e) => {
        this.setState({
            name1: e.target.value
        })
    }

    handleLastName = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    //end of handle input

    formSubmit = (e) => {
        e.preventDefault();

        let data = {
            name1: this.state.name1,
            lastName: this.state.lastName,
            email: this.state.email,
            message: this.state.message
        }

        if(!this.state.name1 || !this.state.lastName || !this.state.email || !this.state.message) {
            alert("Preencha todos os campos!!!");
        }
        else {
            axios.post('/api/forma', data)
            .then(res => {
                this.setState({
                    sent: true,
                }, this.resetForm())
                console.log('Message sent');
            }).catch(() =>{
                console.log('Message not sent');
            });
        }
    }

    //for reseting initial data
    resetForm = () => {
        this.setState({
            name1: '',
            lastName: '',
            email: '',
            message: ''
        })

        setTimeout(()=> {
            this.setState({
                sent:false,
            })
        }, 3000)
    } 

    render() {
        return (
            <div className='containerForm'>
                <form onSubmit={this.formSubmit}>
                    {/* single item */}
                    <div className='singleItem'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' name='name' className='name' placeholder='Seu nome...' value={this.state.name1} onChange={this.handleName1} required />
                    </div>
                    {/* end of single item */}

                    {/* single item */}
                    <div className='singleItem'>
                        <label htmlFor='lastName'>Sobrenome</label>
                        <input type='text' name='lastName' className='lastName' placeholder='Seu sobrenome...' value={this.state.lastName} onChange={this.handleLastName} required />
                    </div>
                    {/* end of single item */}

                    {/* single item */}
                    <div className='singleItem'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' className='email' placeholder='Seu email...' value={this.state.email} onChange={this.handleEmail} required />
                    </div>
                    {/* end of single item */}

                    {/* single item */}
                    <div className='textArea singleItem'>
                        <label htmlFor='message'>Mensagem</label>
                        <textarea name='message' id='message' cols='30' rows='5' placeholder='Sua mensagem...' value={this.state.message} onChange={this.handleMessage} required ></textarea>
                    </div>
                    {/* end of single item */}
                    <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>Mensagem Enviada!</div>
                    <div className='btn'>
                        <button type='submit'>Enviar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;