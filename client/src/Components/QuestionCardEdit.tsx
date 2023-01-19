import React from 'react';
import {useState} from 'react';
import {SyntheticEvent} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faCheck, faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

function QuestionCardEdit({index, subject, currentQuestion, setLoading} : {index: number, subject: string | undefined, currentQuestion: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [currentSubject, setCurrentSubject] = useState<string | undefined>(subject);
    const [question, setQuestion] = useState<string>(currentQuestion.question);
    const [answer, setAnswer] = useState<string>(currentQuestion.answer);
    const [editMode, setEditMode] = useState(false);

    const editQuestion = (event: SyntheticEvent, id: number) => {
        event.preventDefault();

        fetch(`/api/edit-question/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                'subject': currentSubject,
                'question': question,
                'answer': answer
            })
        })
        .then(() => window.location.reload())
    }

    const deleteQuestion = (id: number) => {
        setLoading(true);

        fetch(`/api/delete-question/${id}`, {method: 'DELETE'})
        .then(() => window.location.reload())
    }

    return (
        <>
        {editMode === true ? (
            <form className="questions-card" style={{width: "984px"}} onSubmit={(event) => editQuestion(event, currentQuestion.id)} key={index}>
                <label htmlFor="question-subject">Your question subject <FontAwesomeIcon icon={faBook} /></label>
                <input type="text" placeholder="Your question subject..." value={currentSubject} onChange={(event) => setCurrentSubject(event.target.value)} required></input>
                <label htmlFor="question">Your question <FontAwesomeIcon icon={faCircleQuestion} /></label>
                <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} className="question-submit-textarea" required></textarea>
                <label htmlFor="answer">Your answer <FontAwesomeIcon icon={faCheck} /></label>
                <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} className="question-submit-textarea" required></textarea>
                <button type="submit">Submit</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
            </form>
        ) : (
            <div className="questions-card" key={index}>
                <h4><FontAwesomeIcon icon={faBook} /> {subject}</h4>
                <h2>{currentQuestion.question}</h2>
                <h3 style={{whiteSpace: "pre-wrap"}}><FontAwesomeIcon icon={faCheck} style={{color: "green"}} /> {currentQuestion.answer}</h3>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={() => deleteQuestion(currentQuestion.id)}>Delete</button>
            </div>
        )}
        </>
    )
}

export default QuestionCardEdit;