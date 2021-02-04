import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
            <div className="container">
                <div className="links">
                    <Link to="/" className="button">Etusivu</Link>
                    <Link to="/exams" className="button">Tentit</Link>
                    <Link to="/drop" className="button">Lataa tiedostoja</Link>
                    <Link to="/chat" className="button">Chat</Link>
                </div>
            </div>
    )
}

export default Nav;