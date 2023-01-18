import React from 'react';
import {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignature, faLock} from '@fortawesome/free-solid-svg-icons';

import './register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section id="register-center">
            <h1 id="register-title">Create your account</h1>
            <div id="register-title-card-center">
                <div className="register-title-card" id="register-title-card-1"></div>
                <div className="register-title-card" id="register-title-card-2"></div>
            </div>
            <form id="register-form">
                <label htmlFor="username">Your username <FontAwesomeIcon icon={faSignature} /></label>
                <input type="text" id="username" placeholder="Your username" value={username} onChange={(event) => setUsername(event.target.value)} required></input>
                <label htmlFor="password">Your password <FontAwesomeIcon icon={faLock} /></label>
                <input type="text" id="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} required></input>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default Register;