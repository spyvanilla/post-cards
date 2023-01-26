import React from 'react';
import {useState} from 'react';

import submitUserQuestion from '../Helpers/submitUserQuestion';
import addImage from '../Helpers/addImage';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faCircleQuestion, faCheck, faImage} from '@fortawesome/free-solid-svg-icons';

function QuestionSubmit({setUnloadSubjectsComponent} : {setUnloadSubjectsComponent: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [subject, setSubject] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState<any>(null);

    return (
        <>
        <section id="question-submit-section first-section">
            <h2 className="profile-description" style={{marginBottom: "25px"}}>Submit a question</h2>
            <div id="profile-title-card-center">
                <div className="profile-title-card" id="profile-title-card-1"></div>
                <div className="profile-title-card" id="profile-title-card-2"></div>
            </div>
            <form className="question-submit-card" onSubmit={(event) => submitUserQuestion(event, question, subject, answer, image, setQuestion, setSubject, setAnswer, setImage, setUnloadSubjectsComponent)}>
                <label htmlFor="file" style={{cursor: "pointer"}}>
                {image === null ? <p>Your image (optional) <FontAwesomeIcon icon={faImage} /></p> : <p><FontAwesomeIcon icon={faCheck} style={{color: "green"}} /> Image added succesfully</p>}
                </label>
                <input type="file" id="file" name="file" style={{display: "none"}} onChange={(event) => addImage(event, setImage)}></input>
                <label htmlFor="question-subject">Your question subject <FontAwesomeIcon icon={faBook} /></label>
                <input type="text" placeholder="Your question subject..." value={subject} onChange={(event) => setSubject(event.target.value)} required></input>
                <label htmlFor="question">Your question <FontAwesomeIcon icon={faCircleQuestion} /></label>
                <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} className="question-submit-textarea" required></textarea>
                <label htmlFor="answer">Your answer <FontAwesomeIcon icon={faCheck} /></label>
                <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} className="question-submit-textarea" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
        </>
    )
}

export default QuestionSubmit;