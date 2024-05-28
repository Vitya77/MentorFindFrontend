import React, {useState} from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import RegisterImg from "../img/register.svg";
import LoginImg from "../img/login.svg";

const Auth = ({signUpModeFunc, NotAuthClick, changeSuccessAuth}) => {
    /* Component of authorization page. It containes login and registration forms */

    const [containerClasses, setContainerClasses] = useState("auth-container"); // State and two function to make animation when user switches to sign up or back

    const SignUpClick = (e) => {
        setContainerClasses("auth-container sign-up-mode");
        signUpModeFunc("nav-sign-up-mode");
    }

    const SignInClick = (e) => {
        setContainerClasses("auth-container");
        signUpModeFunc("");
    }

    return (
        <div className={containerClasses}>
            <div className="forms-container">
                <div className="signin-signup">
                    <LoginForm NotAuthClick={NotAuthClick} changeSuccessAuth={changeSuccessAuth}/>
                    <RegistrationForm NotAuthClick={NotAuthClick} changeSuccessAuth={changeSuccessAuth}/>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Вперше на сайті?</h3>
                        <p>
                            Пройдіть швидку процедуру реєстрації та почніть користуватись повним функціоналом сайту
                        </p>
                        <button onClick={SignUpClick} className="btn transparent" id="sign-up-btn" style={{width: 'fit-content'}}>
                          Зареєструватись
                        </button>
                    </div>
                    <img src={LoginImg} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Вже реєструвались?</h3>
                        <p>
                          Увійдіть в акаунт, щоб отримати доступ до своїх даних
                        </p>
                        <button onClick={SignInClick} className="btn transparent" id="sign-in-btn">
                          Увійти
                        </button>
                    </div>
                    <img src={RegisterImg} className="image" alt="" />
                </div>
            </div>
        </div>
    );
}
    
export default Auth;