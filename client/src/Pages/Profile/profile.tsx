import React from 'react';
import {useState, useEffect} from 'react';
import {SyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom';

import Loading from '../../Components/Loading';
import QuestionSubmit from '../../Components/QuestionSubmit';
import Subjects from '../../Components/Subjects';

import {ToastContainer} from 'react-toastify';

import './profile.css';

function Profile({isLogged, setIsLogged} : {isLogged: boolean, setIsLogged: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [username, setUsername] = useState('');
    const [unloadSubjectsComponent, setUnloadSubjectsComponent] = useState(false);
    // When a new question is submitted, the Subjects
    // component is unloaded and reloaded to refresh data
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const onClick = (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        fetch('/api/logout')
        .then(() => setIsLogged(false))
    }

    useEffect(() => {
        if (!isLogged) {
            return navigate('/');
        }
        else {
            fetch('/api/get-username')
            .then(response => response.json())
            .then(response => {
                setUsername(response.username);
                setLoading(false);
            })
        }
    }, [isLogged, navigate])

    return (
        <>
        {loading === true ? <Loading type={1} /> : (
            <>
            <button className="log-out-button" onClick={onClick}>Log out</button>
            <div id="profile-center">
                <h1 id="profile-title">Hi, {username}!</h1>
                <div id="center-submit-sections">
                    <QuestionSubmit setUnloadSubjectsComponent={setUnloadSubjectsComponent} />
                    {unloadSubjectsComponent === true ? '' : <Subjects />}
                </div>
            </div>
            </>
        )}
        <ToastContainer position="top-left" />
        </>
    )
}

export default Profile;