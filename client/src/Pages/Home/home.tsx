import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import './home.css'

function Home(isLogged : {isLogged: boolean}) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogged) {
            return navigate('/profile')
        }
    }, [isLogged, navigate])

    return (
        <section id="post-cards-title-card-center">
            <div>
                <div className="title-card" id="title-card-1"></div>
                <div className="title-card" id="title-card-2"></div>
            </div>
            <h1 id="post-cards-title">Post Cards</h1>
            <h2 id="post-cards-description">The best way of studying</h2>
            <button id="get-started-button" onClick={() => navigate('/register')}>Get Started</button>
        </section>
    )
}

export default Home