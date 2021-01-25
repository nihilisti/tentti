import React from 'react';
import './App.css';

const Nav = () => {
    return (
        <div className="container">
            <div className="links">
                <button href="/tentit" className="button">Tentit</button>
                <button href="/tietoa" className="button">Tietoa sovelluksesta</button>
            </div>
        </div>
    )
}

export default Nav;