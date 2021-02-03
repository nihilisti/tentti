import React from 'react'

export default ({ name, message }) =>
    <div className="msgItem">
        <div className="name">{name}</div>
        <div className="message">
            <div className="msgContent">{message}</div>
        </div>
    </div>