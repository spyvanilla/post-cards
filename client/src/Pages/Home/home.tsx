import React from 'react';
import {useState} from 'react';

import Subjects from '../../Components/Subjects';

function Home() {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <>
        <h1>Post Cards</h1>
        <p>Submit a question here</p>
        <form>
            <input type="text" placeholder="Your question..." value={question} onChange={(event) => setQuestion(event.target.value)} required></input>
            <input type="text" placeholder="Question subject..." value={subject} onChange={(event) => setSubject(event.target.value)} required></input>
            <input type="text" placeholder="Your answer..." value={answer} onChange={(event) => setAnswer(event.target.value)} required></input>
            <input type="submit" value="Submit"></input>
        </form>
        <Subjects />
        </>
    )
}

export default Home;