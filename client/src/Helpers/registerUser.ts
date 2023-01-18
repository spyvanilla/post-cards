import {NavigateFunction} from 'react-router-dom';

import {toast} from 'react-toastify';

const registerUser = (event: React.FormEvent<HTMLFormElement>, username: string, password: string, confirmPassword: string, navigate: NavigateFunction) => {
    event.preventDefault();

    if (password !== confirmPassword) {
        toast.error('Your passwords are not equal', {position: "top-left"});
        return;
    }

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        toast.error('Your password needs letters and numbers', {position: "top-left"});
        return;
    }

    fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(response => {
        if (response.auth) {
            return navigate('/login');
        }

        toast.error(response.error, {position: "top-left"});
    })
}

export default registerUser;