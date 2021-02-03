import React from 'react';
import './App.css';

const Nav = () => {
    return (
            <div className="container">
                <div className="links">
                    <a href="/" className="button">Etusivu</a>
                    <a href="/exams" className="button">Tentit</a>
                    <a href="/drop" className="button">Lataa tiedostoja</a>
                    <a href="/chat" className="button">Chat</a>
                </div>
            </div>
    )
}

export default Nav;