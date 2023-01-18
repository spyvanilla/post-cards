const submitUserQuestion = (event: React.FormEvent<HTMLFormElement>, question: string, subject: string, answer: string, setQuestion: React.Dispatch<React.SetStateAction<string>>, setSubject: React.Dispatch<React.SetStateAction<string>>, setAnswer: React.Dispatch<React.SetStateAction<string>>, setUnloadSubjectsComponent: React.Dispatch<React.SetStateAction<boolean>>) => {
    event.preventDefault();

    setUnloadSubjectsComponent(true);
    setQuestion('');
    setSubject('');
    setAnswer('');

    fetch('/api/submit-question', {
        method: 'POST',
        body: JSON.stringify({
            question: question,
            subject: subject,
            answer: answer
        })
    })
    .then(() => setUnloadSubjectsComponent(false));
}

export default submitUserQuestion;