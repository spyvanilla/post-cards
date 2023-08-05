import React from 'react'
import {useState} from 'react'
import {SyntheticEvent} from 'react'

import addImage from '../Helpers/addImage'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage, faBook, faCheck, faCircleQuestion} from '@fortawesome/free-solid-svg-icons'

function QuestionCardEdit({index, subject, currentQuestion, setLoading} : {index: number, subject: string | undefined, currentQuestion: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [image, setImage] = useState<any>(currentQuestion.image)
    const [currentSubject, setCurrentSubject] = useState<string | undefined>(subject)
    const [question, setQuestion] = useState<string>(currentQuestion.question)
    const [answer, setAnswer] = useState<string>(currentQuestion.answer)
    const [editMode, setEditMode] = useState(false)

    const editQuestion = (event: SyntheticEvent, id: number) => {
        event.preventDefault()

        if (currentSubject === undefined) {
            return
        }

        const formData = new FormData()
        formData.append('subject', currentSubject)
        formData.append('question', question)
        formData.append('answer', answer)
        formData.append('image', image)

        fetch(`/api/edit-question/${id}`, {
            method: 'POST',
            body: formData
        })
        .then(() => window.location.reload())
    }

    const deleteQuestion = (id: number) => {
        setLoading(true)

        fetch(`/api/delete-question/${id}`, {method: 'DELETE'})
        .then(() => window.location.reload())
    }

    const deleteImage = (id: number) => {
        if (currentQuestion.image !== undefined) {
            fetch(`/api/delete-question-image/${id}`, {method: 'DELETE'})
            .then(() => setImage(undefined))
        }
        else {
            setImage(undefined)
        }
    }

    return (
        <>
        {editMode === true ? (
            <form className="questions-card" onSubmit={(event) => editQuestion(event, currentQuestion.id)} key={index}>
                <label htmlFor="file" style={{cursor: "pointer"}}>
                <p>{image === undefined ? "Add your image" : "Change your image"} <FontAwesomeIcon icon={faImage} /></p>
                </label>
                <input type="file" id="file" name="file" style={{display: "none"}} onChange={(event) => addImage(event, setImage)}></input>
                {image === undefined ? '' : <button type="button" onClick={() => deleteImage(currentQuestion.id)}>Delete image</button>}
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
                {currentQuestion.image !== undefined ? <img src={`/api/get-question-image-by-id/${currentQuestion.id}`} alt={currentQuestion.image}></img> : ''}
                <h3 style={{whiteSpace: "pre-wrap"}}><FontAwesomeIcon icon={faCheck} style={{color: "green"}} /> {currentQuestion.answer}</h3>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={() => deleteQuestion(currentQuestion.id)}>Delete</button>
            </div>
        )}
        </>
    )
}

export default QuestionCardEdit