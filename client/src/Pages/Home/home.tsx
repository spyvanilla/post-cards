import React from 'react';
import {useState} from 'react';
import {SyntheticEvent} from 'react';

import Subjects from '../../Components/Subjects';

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
        <h1>Post Cards</h1>
        <p>Submit a question here</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Question subject..." value={subject} onChange={(event) => setSubject(event.target.value)} required></input>
            <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} required></textarea>
            <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} required></textarea>
            <input type="submit" value="Submit"></input>
        </form>
        {unloadSubjectsComponent === true ? '' : (
            <Subjects />
        )}
        </>
    )
}

export default Home;