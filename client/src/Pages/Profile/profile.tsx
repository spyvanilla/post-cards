import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../../Components/Loading';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

import './profile.css';

function Profile(isLogged : {isLogged: boolean}) {
    const [questionSubject, setQuestionSubject] = useState('');
    const [question, setQuestion] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            return navigate('/');
        }

        fetch('/api/get-username')
        .then(response => response.json())
        .then(response => {
            setUsername(response.username);
            setLoading(false);
        })
    }, [isLogged, navigate])

    return (
        <>
        {loading === true ? <Loading type={1} /> : (
            <>
            <div id="profile-center">
                <h1 id="profile-title">Hi, {username}!</h1>
                <h2 id="profile-description" style={{marginBottom: "25px"}}>Submit a question</h2>
                <div id="profile-title-card-center">
                    <div className="profile-title-card" id="profile-title-card-1"></div>
                    <div className="profile-title-card" id="profile-title-card-2"></div>
                </div>
                <form id="question-submit-card">
                    <label htmlFor="question-subject">Your question subject <FontAwesomeIcon icon={faBook} /></label>
                    <input type="text" placeholder="Your question subject..." value={questionSubject} onChange={(event) => setQuestionSubject(event.target.value)} required></input>
                    <label htmlFor="question">Your question <FontAwesomeIcon icon={faCircleQuestion} /></label>
                    <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} className="question-submit-textarea" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            </>
        )}
        </>
    )
}

export default Profile;