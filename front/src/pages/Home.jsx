// Import dependencies
import axios from 'axios'
import React, { Component } from 'react'

// Import style
import '../styles/pages/Home.css'

// Import components
import Main from '../components/template/Main'

class Home extends Component {


    render() {
        return(
            <div className="home">
                <Main />
            </div>
        )
    }
}

export default Home