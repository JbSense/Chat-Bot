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
    start: true,
    styles: {
        background_color: '',
        me_color: '',
        bot_color: ''
    },
    messages: []
}

class Chat extends Component {

    /**
     * Seta o estado inicial 
     */
    state = { ...initialState }

    /**
     * Chamada sempre que a página é carrega
     */
    start() {
        if(this.state.start === true) {
            this.updateMessages()
            this.setState({ start: false })
        }
    }

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

                <Writer />
            </div>
        )
    }
}

export default Chat