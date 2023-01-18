import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import loginUser from '../../Helpers/loginUser';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignature, faLock} from '@fortawesome/free-solid-svg-icons';
import {ToastContainer} from 'react-toastify';

function Login({setIsLogged} : {setIsLogged: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <>
        <section id="register-center">
            <h1 id="register-title">Welcome back</h1>
            <div id="register-title-card-center">
                <div className="register-title-card" id="register-title-card-1"></div>
                <div className="register-title-card" id="register-title-card-2"></div>
            </div>
            <form id="register-form" onSubmit={(event) => loginUser(event, username, password, setIsLogged, navigate)}>
                <label htmlFor="username">Your username <FontAwesomeIcon icon={faSignature} /></label>
                <input type="text" id="username" placeholder="Your username" value={username} onChange={(event) => setUsername(event.target.value)} maxLength={20} required></input>
                <label htmlFor="password">Your password <FontAwesomeIcon icon={faLock} /></label>
                <input type="password" id="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required></input>
                <button type="submit">Submit</button>
                <Link to="/register">Don't have an account? Click here</Link>
            </form>
        </section>
        <ToastContainer position="top-left" />
        </>
    )
}

export default Login;