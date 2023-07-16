
import Nav from "../components/Nav"

import{useState} from "react"

import AuthModal from "../components/AuthModal"

import {useCookies} from "react-cookie"


const Home =() =>{

    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    //const authToken = false

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return(
        <div className="overlay">
            <Nav minimal={false} 
                authToken={authToken} 
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp} 
             />
            <div className="home">
                <h1 className="primary-title">Balayer à Droite ⇢</h1>
                <button className="primary-button" onClick={handleClick}> 
                    {authToken? "Déconnexion": "S'inscrire"}
                </button>
                {
                    showModal &&(
                        <AuthModal setShowModal={setShowModal}  isSignUp={isSignUp} />
                    )
                }
            </div>
        </div>
    )
}

export default Home