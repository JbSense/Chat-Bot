// Import dependências
import axios from 'axios';
import React, { Component } from 'react';

// Import css
import '../styles/components/Chat.css'

// Import components
import Message from './Message';
import Contact from './Contact';
import Writer from './Writer';

// Estado inicial da aplicação
const initialState = {
    new_message: true,
    styles: {
        background_color: '',
        me_color: '',
        bot_color: ''
    },
    messages: [],
    writing: ''
}

class Chat extends Component {

    /**
     * Seta o estado inicial 
     */
    state = { ...initialState }

    /**
     * Função usada para consumir o backend
     * 
     * @param {string} method -  o método que será usado na requisição
     * @param {string} where - função da api que será usada
     * @param {json} obj - json que será cadastrado no banco caso seja um cadastro
     * @returns o data da requisição
     */
    api(method, where, obj = null) {
        const config = {
            method: method,
            url: `http://localhost:8080/api/${where}`,
            data: obj
        }

        return axios(config).then(response => response.data)
    }

    /**
     * Chamada sempre que a página é carrega
     */
    start() {
        if(this.state.new_message === true ) { 
            this.updateMessages()
            this.getSystemInformations()
            this.setState({ new_message: false })
        }
    }

    /**
     * Chama a função api para obter as mensagens salvas e seta no state.messages
     */
    updateMessages() {
        this.api('get', 'get-messages').then(data => {
            const messages = []
            for(let x in data.data) {
                messages.unshift(data.data[x])
            }

            this.setState({ messages: messages })
        })
    }

    getSystemInformations() {
        this.api('get', 'get-system').then(data => {
            const soComplete = `${data.data.so.plataform} ${data.data.so.architecture[0]} ${data.data.so.architecture[1]}`
            console.log(soComplete)
        })
    }

    /**
     * Renderiza as imagens para exibir na tela
     * 
     * @returns a mensagem chamando o component Message 
     */
    renderMessages() {
        const messages = []
        for(let x in this.state.messages) {
            messages.unshift(this.state.messages[x])
        }

        return(
            messages.map((key) => {
                return <Message user={key.user} message={key.message} />
            })
        )
    }

    /**
     * Adiciona o que está sendo escrito no state.writing
     *
     * @param {event} event - recebe o evento que chamou a function
     */
     writing(event) {
        this.setState({ writing: event.target.value })
    }

    /*
     * Limpa o writing
     */
    clear() {
        this.setState({ writing: "" })
    }

    /**
     * Valida se a tecla pressionada foi (Enter) 
     * 
     * @param {event} event - recebe o evento, tecla que foi pressionada
     * 
     * Caso a validação retorne true, chama a funtion sendMessage
     */
    enter(event) {
        if(event.code === "Enter") this.sendMessage()
    }

    /**
     * Salva o state.writing como uma nova mensagem no banco usando formdata 
     */
    sendMessage() {
        const body = new FormData

        body.append('message', this.state.writing)
        body.append('user', 'client')

        this.api('post', 'create-message', body).then(data => {
            const messages = []
            for(let x in data.data) {
                messages.unshift(data.data[x])
            }

            this.setState({ messages: messages })
            this.clear()
        })
        
        return
    }

    /**
     * Função utiliza para testes
     */
    test() {
        console.log('a')
    }

    render() {
        return(
            <div className='chat' onLoad={this.start()}>
                <Contact />
                <div className='messages'>
                    {this.renderMessages()}
                </div>

                <div className='writer'>
                    <input type="text" name="message" id="writer" placeholder="Digite..." value={this.state.writing} onChange={ e => this.writing(e) } onKeyDown={(e) => this.enter(e)}/>
                </div>
            </div>
        )
    }
}

export default Chat