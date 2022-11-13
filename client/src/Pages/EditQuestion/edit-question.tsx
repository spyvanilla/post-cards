import React from 'react';
import {SyntheticEvent} from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function EditQuestion() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const subject = useParams().subject;
    const id = useParams().id;

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        fetch(`/api/edit-question/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                question: question,
                answer: answer
            })
        })
        .then(response => response.json())
        .then(() => setRedirect(true));
    };

    useEffect(() => {
        if (redirect) return navigate(`/edit-questions/${subject}`)

        fetch(`/api/get-question-by-id/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.question === null) return navigate('/');

            setQuestion(data.question);
            setAnswer(data.answer);
            setLoading(false);
        })
    }, [subject, id, redirect, navigate]);

    return (
        <>
        {loading === true ? '' : (
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Your question..." rows={10} style={{resize: "none"}} value={question} onChange={(event) => setQuestion(event.target.value)} required></textarea>
                <textarea placeholder="Your answer..." rows={10} style={{resize: "none"}} value={answer} onChange={(event) => setAnswer(event.target.value)} required></textarea>
                <input type="submit" value="Edit"></input>
            </form>
        )}
        </>
    )
}

export default EditQuestion;