import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Subjects() {
    const [availableSubjects, setAvailableSubjects] = useState<any>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [start, setStart] = useState(false); // Redirects to questions page
    const [edit, setEdit] = useState(false); // Redirects to edit questions page
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const startGame = () => {
        if (selectedSubject.length > 0) setStart(true);
    }

    const editQuestions = () => {
        if (selectedSubject.length > 0) setEdit(true);
    }

    useEffect(() => {
        fetch('/api/get-subjects')
        .then(response => response.json())
        .then(data => {
            setAvailableSubjects(data);
            
            if (data.length > 0) {
                setSelectedSubject(data[0].subject);
            }
            setLoading(false);
        })
    }, [navigate]);

    useEffect(() => {
        if (start) {
            return navigate(`/questions/${selectedSubject}`);
        }
        if (edit) {
            return navigate(`/edit-questions/${selectedSubject}`);
        }
    }, [selectedSubject, start, edit, navigate]);

    return (
        <>
        {loading === true ? <></> : (
            <>
            {availableSubjects.length === 0 ? <></> : (
                <section>
                    <h2>Answer your questions</h2>
                    <label htmlFor="subject">Select a subject</label>
                    <select name="subject" id="subject" value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
                    {availableSubjects.map((subject: any, index: number) => {
                        return (
                            <option value={subject.subject} key={index}>{subject.subject.charAt(0).toUpperCase() + subject.subject.slice(1)}</option>
                        )
                    })}
                    </select>
                    <button onClick={startGame}>Start</button>
                    <button onClick={editQuestions}>Edit questions</button>
                </section>
            )}
            </>
        )}
        </>
    )
}

export default Subjects;