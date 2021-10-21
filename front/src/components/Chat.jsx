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
            this.setState({ new_message: false })
        }
    }

    checkNewMessage() {
        const writer = document.getElementById('writer')
        writer.addEventListener('click', () => {
            console.log("here")
        })
    }

    /**
     * Chama a função api para obter as mensagens salvas e seta no state.messages
     */
    updateMessages() {
        this.api('get', 'get-history').then(data => {
            const messages = []
            for(let x in data.data) {
                messages.unshift(data.data[x])
            }

            this.setState({ messages: messages })
        })
    }

    /**
     * Acessa o backend para obter os estilos das mensagens
     * 
     * @return a mensagem com os estilos
     */
    getStyles() {
        this.api('get', 'get-styles').then(data => {
            
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
        console.log(this.state.writing)
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

    /* 
     * Faz a formatação da mensagem e salva no state.writing
     */
    formatMessage(message) {
        var words = {
            a : /[\xE0-\xE6]/g,
            e : /[\xE8-\xEB]/g,
            i : /[\xEC-\xEF]/g,
            o : /[\xF2-\xF6]/g,
            u : /[\xF9-\xFC]/g,
            c : /\xE7/g,
            n : /\xF1/g
        };
        
        let msg = message.toLowerCase()

        for ( var x in words ) {
            msg = msg.replace( words[x], x );
        }
    
        return msg
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
                {/* <Writer /> */}
            </div>
        )
    }
}

export default Chat