import {NavigateFunction} from 'react-router-dom';

import {toast} from 'react-toastify';

const loginUser = (event: React.FormEvent<HTMLFormElement>, username: string, password: string, navigate: NavigateFunction) => {
    event.preventDefault();

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(response => {
        if (response.auth) {
            return navigate('/profile');
        }

        toast.error(response.error, {position: "top-left"});
    })
}

export default loginUser;