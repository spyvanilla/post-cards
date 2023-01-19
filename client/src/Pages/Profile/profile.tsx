import React from 'react';
import {useState, useEffect} from 'react';
import {SyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../../Components/Loading';
import Subjects from '../../Components/Subjects';
import submitUserQuestion from '../../Helpers/submitUserQuestion';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faCircleQuestion, faCheck} from '@fortawesome/free-solid-svg-icons';

import './profile.css';

function Profile({isLogged, setIsLogged} : {isLogged: boolean, setIsLogged: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [subject, setSubject] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [username, setUsername] = useState('');
    const [unloadSubjectsComponent, setUnloadSubjectsComponent] = useState(false);
    // When a new question is submitted, the Subjects
    // component is unloaded and reloaded to refresh data
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const onClick = (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        fetch('/api/logout')
        .then(() => setIsLogged(false))
    }

    useEffect(() => {
        if (!isLogged) {
            return navigate('/');
        }
        else {
            fetch('/api/get-username')
            .then(response => response.json())
            .then(response => {
                setUsername(response.username);
                setLoading(false);
            })
        }
    }, [isLogged, navigate])

    return (
        <>
        {loading === true ? <Loading type={1} /> : (
            <>
            <button className="log-out-button" onClick={onClick}>Log out</button>
            <div id="profile-center">
                <h1 id="profile-title">Hi, {username}!</h1>
                <h2 className="profile-description" style={{marginBottom: "25px"}}>Submit a question</h2>
                <div id="profile-title-card-center">
                    <div className="profile-title-card" id="profile-title-card-1"></div>
                    <div className="profile-title-card" id="profile-title-card-2"></div>
                </div>
                <form className="question-submit-card" onSubmit={(event) => submitUserQuestion(event, question, subject, answer, setQuestion, setSubject, setAnswer, setUnloadSubjectsComponent)}>
                    <label htmlFor="question-subject">Your question subject <FontAwesomeIcon icon={faBook} /></label>
                    <input type="text" placeholder="Your question subject..." value={subject} onChange={(event) => setSubject(event.target.value)} required></input>
                    <label htmlFor="question">Your question <FontAwesomeIcon icon={faCircleQuestion} /></label>
                    <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} className="question-submit-textarea" required></textarea>
                    <label htmlFor="answer">Your answer <FontAwesomeIcon icon={faCheck} /></label>
                    <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} className="question-submit-textarea" required></textarea>
                    <button type="submit">Submit</button>
                </form>
                {unloadSubjectsComponent === true ? <Loading type={2} /> : <Subjects />}
            </div>
            </>
        )}
        </>
    )
}

export default Profile;