// Import dependencies
import axios from 'axios'
import React, { Component } from 'react'

// Import css
import '../styles/components/Writer.css'

// Estado inicial da aplicação
const initialState = {
    writing: ''
}

class Writer extends Component {
    /**
     * Seta o state com initialState
     */
    state = { ...initialState }

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
     * Faz validações sobre a mensagem enviada
     * 
     * @param {string} message - a mensagem enviada 
     * @returns true caso as validações sejam cumpridas e false caso falhe em alguma validação
     */
    validateMessage(message) {
        if(message != '') { return true }
    }

    /**
     * Salva o state.writing como uma nova mensagem no banco usando formdata 
     */
    sendMessage() {
        const body = new FormData

        if(this.validateMessage(this.state.writing)) {
            body.append('message', this.state.writing)
            body.append('user', 'client')
    
            const config = {
                method: 'post',
                url: 'http://localhost:8080/api/create-message',
                data: body,
                headers: { "Content-Type": "multipart/form-data" }
            }
    
            axios(config).then(response => {
                this.clear()
            })
        }

        return
    }

    render() {
        return(
            <div className='writer'>
                <input type="text" name="message" id="writer" placeholder="Digite..." value={this.state.writing} onChange={ e => this.writing(e) } onKeyDown={(e) => this.enter(e)}/>
            </div>
        )
    }
}

export default Writer