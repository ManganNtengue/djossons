import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'




const AuthModal =({setShowModal, isSignUp}) =>{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword);

    const handleClick = () => {
        setShowModal(false);
    }

    //const isSignUp = true
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('handleSubmit called');

        try {
            if(isSignUp && (password!== confirmPassword)) {
                setError("Les mots de passe ne correspondent pas");
                return
            } 

            // post request to our database
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()






        }catch(error) {
            console.log(error);
        }
    }


    return(
        
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>Ⓧ</div>
        
            <h2>{isSignUp? "Creer un compte": 'Se connecter'}</h2>
            <p>{isSignUp?'Clicquant sur S inscrire vous accepter les termes et conditions. Apprenez la politque de confidentialite que nous appliquons a vos donnees ici.':''}</p>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                id='email'
                name="email"
                placeholder="email"
                required= {true}
                onChange={(e)=> setEmail(e.target.value)}
                
                />
                <input 
                type="password"
                id='password'
                name="password"
                placeholder="Mot de passe"
                required= {true}
                onChange={(e)=> setPassword(e.target.value)}
                
                />

                { isSignUp && <input 
                type="password"
                id='password-check'
                name="password-check"
                placeholder="Confirmation du mot de passe"
                required= {true}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                
                />}
                <input type="submit"  className="secondary-button"/>
                <p>{error}</p>
            </form>
            
            <hr />
            <h2>GET THE APP</h2>

        
        </div>
    )
}

export default AuthModal