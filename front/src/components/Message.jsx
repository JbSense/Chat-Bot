// Import dependencies
import React from 'react'

// Import css
import '../styles/components/Message.css'

function Message(props) {
    return(
        <div className="message">
            <p className={`${props.user}`}>{props.message}</p>
        </div>
    )
}

export default Message