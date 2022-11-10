import React from 'react';
import {useState, useEffect} from 'react';

function Subjects() {
    const [availableSubjects, setAvailableSubjects] = useState<any>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-subjects')
        .then(response => response.json())
        .then(data => {
            setAvailableSubjects(data);
            setLoading(false);
        })
    }, []);

    return (
        <>
        {loading === true ? <></> : (
            <>
            {availableSubjects.length === 0 ? <></> : (
                <section>
                    <h2>Answer your questions</h2>
                    <label htmlFor="subject">Select a subject</label>
                    <select name="subject" id="subject" onChange={(event) => setSelectedSubject(event.target.value)}>
                    {availableSubjects.map((subject: any, index: number) => {
                        return (
                            <option value={subject.subject} key={index}>{subject.subject.charAt(0).toUpperCase() + subject.subject.slice(1)}</option>
                        )
                    })}
                    </select>
                    <button>Start</button>
                </section>
            )}
            </>
        )}
        </>
    )
}

export default Subjects;