import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import Loading from '../../Components/Loading';
import QuestionCardEdit from '../../Components/QuestionCardEdit';

function EditQuestions() {
    const [questions, setQuestions] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const subject = useParams().subject;

    useEffect(() => {
        fetch(`/api/get-questions-from-subject/${subject}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return navigate('/profile');

            setQuestions(data);
            setLoading(false);
        })
    }, [subject, navigate]);

    return (
        <>
        {loading === true ? <Loading type={1} /> : (
            <>
            <button onClick={() => navigate('/profile')} className="log-out-button">Back to home</button>
            {questions.map((currentQuestion: any, index: number) => {
                return <QuestionCardEdit index={index} subject={subject} currentQuestion={currentQuestion} setLoading={setLoading} />
            })}
            </>
        )}
        </>
    )
}

export default EditQuestions;