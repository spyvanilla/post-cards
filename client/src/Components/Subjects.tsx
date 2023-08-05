import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faChevronDown} from '@fortawesome/free-solid-svg-icons'

function Subjects() {
    const [availableSubjects, setAvailableSubjects] = useState<any>([])
    const [selectedSubject, setSelectedSubject] = useState('')
    const [start, setStart] = useState(false) // Redirects to questions page
    const [edit, setEdit] = useState(false) // Redirects to edit questions page
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const startGame = () => {
        if (selectedSubject.length > 0) setStart(true)
    }

    const editQuestions = () => {
        if (selectedSubject.length > 0) setEdit(true)
    }

    useEffect(() => {
        fetch('/api/get-subjects')
        .then(response => response.json())
        .then(data => {
            setAvailableSubjects(data)
            
            if (data.length > 0) {
                setSelectedSubject(data[0].subject)
            }
            setLoading(false)
        })
    }, [navigate])

    useEffect(() => {
        if (start) {
            return navigate(`/questions/${selectedSubject}`)
        }
        if (edit) {
            return navigate(`/edit-questions/${selectedSubject}`)
        }
    }, [selectedSubject, start, edit, navigate])

    return (
        <>
        {loading === true ? '' : (
            <>
            {availableSubjects.length === 0 ? <></> : (
                <section className="question-submit-section">
                    <h2 className="profile-description" style={{marginBottom: "25px"}}>Answer your questions</h2>
                    <div id="profile-title-card-center">
                        <div className="profile-title-card" id="profile-title-card-1"></div>
                        <div className="profile-title-card" id="profile-title-card-2"></div>
                    </div>
                    <section className="question-submit-card" style={{alignItems: "center"}}>
                        <label htmlFor="subject">Select a subject <FontAwesomeIcon icon={faBook} /></label>
                        <div>
                            <select name="subject" id="subject" value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
                            {availableSubjects.map((subject: any, index: number) => {
                                return (
                                    <option value={subject.subject} key={index}>{subject.subject.charAt(0).toUpperCase() + subject.subject.slice(1)}</option>
                                )
                            })}
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} id="select-icon" />
                        </div>
                        <button onClick={startGame}>Start</button>
                        <button onClick={editQuestions}>Edit questions</button>
                    </section>
                </section>
            )}
            </>
        )}
        </>
    )
}

export default Subjects