import React from 'react';
import {useState, useEffect} from 'react';
import {SyntheticEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faCheck} from '@fortawesome/free-solid-svg-icons';

import './questions.css';

function Questions() {
    const [questions, setQuestions] = useState<any>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const subject = useParams().subject;
    const navigate = useNavigate();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        setShowAnswer(true);
    }

    const changeCurrentQuestion = () => {
        if (questions.length === 0) {
            setRedirect(true);
            return;
        }
        setShowAnswer(false);

        let currentQuestions = questions; // Array with the quantity of questions left
        setCurrentQuestion(currentQuestions[0]);
        currentQuestions.shift();
        setQuestions(currentQuestions);
    }

    useEffect(() => {
        if (redirect) return navigate('/profile');

        fetch(`/api/get-questions-from-subject/${subject}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return navigate('/profile');

            let currentQuestions = data;
            setCurrentQuestion(currentQuestions[0]);
            currentQuestions.shift();
            setQuestions(currentQuestions);
            setLoading(false);
        })
    }, [redirect, subject, navigate])

    return (
        <>
        {loading === true ? '' : (
            <div className="questions-card">
                <h4><FontAwesomeIcon icon={faBook} /> {subject}</h4>
                {showAnswer === false ? (
                    <>
                    <h2>{currentQuestion.question}</h2>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Show answer</button>
                    </form>
                    </>
                ) : (
                    <>
                    <h3 style={{whiteSpace: "pre-wrap"}}><FontAwesomeIcon icon={faCheck} style={{color: "green"}} /> {currentQuestion.answer}</h3>
                    <button onClick={changeCurrentQuestion}>Continue</button>
                    </>
                )}
                <button onClick={() => setRedirect(true)}>Cancel</button>
            </div>
        )}
        </>
    )
}

export default Questions;