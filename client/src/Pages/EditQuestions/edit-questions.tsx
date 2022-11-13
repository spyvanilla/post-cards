import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';

function EditQuestions() {
    const [questions, setQuestions] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const subject = useParams().subject;

    useEffect(() => {
        fetch(`/api/get-questions-from-subject/${subject}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return navigate('/');

            setQuestions(data);
            setLoading(false);
        })
    }, [subject, navigate]);

    return (
        <>
        {loading === true ? '' : (
            <>
            <Link to="/">Back to home</Link>
            {questions.map((currentQuestion: any, index: number) => {
                return (
                    <div key={index}>
                        <h2 style={{whiteSpace: "pre-wrap"}}>{currentQuestion.question}</h2>
                        <h3>{currentQuestion.answer}</h3>
                        <Link to={`/edit-questions/${subject}/${currentQuestion.id}`}>Edit</Link>
                    </div>
                )
            })}
            </>
        )}
        </>
    )
}

export default EditQuestions;