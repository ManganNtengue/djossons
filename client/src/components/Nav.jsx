// import logo1 from '../images/logo1.png'
// import logo from '../images/logo.PNG'
//import colorLogo from '../images/colorLogo.png'

import pinklogo from '../images/pinklogo.PNG'
import bluelogo from '../images/bluelogo.PNG'




// {minimal, authToken}


const Nav =({minimal, authToken, setShowModal, showModal, setIsSignUp}) =>{

        const handleClick = ()=>{
            setShowModal(true);
            setIsSignUp(false);
        };
    // const minimal = false
    // {minimal? logo : logo}

    return(
        <nav>
            <div className="logo-container">
                <img
                className="logo"
                src={minimal ? bluelogo:pinklogo }
                alt="logo"
                />
            </div>
            {!authToken && !minimal && (
                <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
                >
                Connection
                </button>
            )}
        </nav>
    );
}

export default Nav