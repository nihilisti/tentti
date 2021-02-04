import React from 'react';

export default ({ name, message, myName }) =>
    <div className={myName === name ? "msgItem2" : "msgItem"}>
        <div className="name">{name}</div>
        <div className={myName === name ? "message2" : "message"}>
            <div className="msgContent">{message}</div>
        </div>
    </div>