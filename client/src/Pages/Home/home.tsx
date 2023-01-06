import React from 'react';
import {useState} from 'react';
import {SyntheticEvent} from 'react';

import Subjects from '../../Components/Subjects';

import './home.css';

function Home() {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [unloadSubjectsComponent, setUnloadSubjectsComponent] = useState(false);
    // When a new question is submitted, the Subjects
    // component is unloaded and reloaded to refresh data

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        setUnloadSubjectsComponent(true);
        setQuestion('');
        setSubject('');
        setAnswer('');

        fetch('/api/submit-question', {
            method: 'POST',
            body: JSON.stringify({
                question: question,
                subject: subject,
                answer: answer
            })
        })
        .then(() => setUnloadSubjectsComponent(false));
    };

    return (
        <>
        <section id="post-cards-title-card-center">
            <div>
                <div className="title-card" id="title-card-1"></div>
                <div className="title-card" id="title-card-2"></div>
            </div>
            <h1 id="post-cards-title">Post Cards</h1>
            <h2 id="post-cards-description">The best way of studying</h2>
            <button id="get-started-button">Get Started</button>
        </section>
        <section id="post-cards-question-submit-center">
            <h2 id="question-submit-title">Submit a question here</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Question subject..." value={subject} onChange={(event) => setSubject(event.target.value)} required></input>
                <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} required></textarea>
                <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} required></textarea>
                <input type="submit" value="Submit"></input>
            </form>
            {unloadSubjectsComponent === true ? '' : (
                <Subjects />
            )}
        </section>
        </>
    )
}

export default Home;