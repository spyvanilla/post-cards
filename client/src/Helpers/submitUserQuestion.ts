const submitUserQuestion = (event: React.FormEvent<HTMLFormElement>, question: string, subject: string, answer: string, image: any, setQuestion: React.Dispatch<React.SetStateAction<string>>, setSubject: React.Dispatch<React.SetStateAction<string>>, setAnswer: React.Dispatch<React.SetStateAction<string>>, setImage: React.Dispatch<any>, setUnloadSubjectsComponent: React.Dispatch<React.SetStateAction<boolean>>) => {
    event.preventDefault();

    setUnloadSubjectsComponent(true);
    setQuestion('');
    setSubject('');
    setAnswer('');
    setImage(null);

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('image', image);

    fetch('/api/submit-question', {
        method: 'POST',
        body: formData
    })
    .then(() => setUnloadSubjectsComponent(false));
}

export default submitUserQuestion;