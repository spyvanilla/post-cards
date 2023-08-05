import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

import registerUser from '../../Helpers/registerUser'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignature, faLock, faCheck} from '@fortawesome/free-solid-svg-icons'
import {ToastContainer} from 'react-toastify'

import './register.css'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    return (
        <>
        <section id="register-center">
            <h1 id="register-title">Create your account</h1>
            <div id="register-title-card-center">
                <div className="register-title-card" id="register-title-card-1"></div>
                <div className="register-title-card" id="register-title-card-2"></div>
            </div>
            <form id="register-form" onSubmit={(event) => registerUser(event, username, password, confirmPassword, navigate)}>
                <label htmlFor="username">Your username <FontAwesomeIcon icon={faSignature} /></label>
                <input type="text" id="username" placeholder="Your username" value={username} onChange={(event) => setUsername(event.target.value)} maxLength={20} required></input>
                <label htmlFor="password">Your password <FontAwesomeIcon icon={faLock} /></label>
                <input type="password" id="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required></input>
                <label htmlFor="confirm-password">Confirm your password <FontAwesomeIcon icon={faCheck} /></label>
                <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={6} required></input>
                <button type="submit">Submit</button>
                <Link to="/login">Already have an account? Click here</Link>
            </form>
        </section>
        <ToastContainer position="top-center" />
        </>
    )
}

export default Register