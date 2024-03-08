import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '../config'

const schema = Yup.object().shape({
  email: Yup.string().email()
});

const serverURL = config.serverURL;

const LoginForm = ({NotAuthClick, changeSuccessAuth}) => {
    const [formData, setFormData] = useState({
        // Створіть стан для зберігання даних форми
        usernameOrEmail: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [unauthorised, setUnauthorised] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        var isEmail = false;
        isEmail = await schema.isValid({ email: formData.usernameOrEmail })

        const dataToSend = isEmail ? JSON.stringify({
            email: formData.usernameOrEmail,
            password: formData.password
        }) : JSON.stringify({
            username: formData.usernameOrEmail,
            password: formData.password
        });

        await fetch(`${serverURL}/users/login/`, {
            method: 'POST',
            body: dataToSend,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    setUnauthorised(true);
                    return;
                }
            })
            .then(data => {
                console.log(data.token);
                localStorage.setItem('mentorFindToken', data.token);
                changeSuccessAuth();
                NotAuthClick();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    if (localStorage.getItem('mentorFindToken') !== null && localStorage.getItem('mentorFindToken') !== "") {
        return <Navigate replace to="/" />;
    }
    return (
        <form onSubmit={handleSubmit} method="post" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user" />
                <input 
                    type="text" 
                    placeholder="Ім'я користувача" 
                    id="in-username"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}    
                />
            </div>
            {unauthorised && (<span className="error-span">Неправильно введене ім'я користувача, емейл або пароль</span>)}
            <div className="input-field">
                <i className="fas fa-lock" />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    id="in-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}    
                />
            </div>
            {unauthorised && (<span className="error-span">Неправильно введене ім'я, емейл користувача або пароль</span>)}
            <input type="submit" defaultValue="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in" />
                </a>
            </div>
        </form>
      
    );
}

export default LoginForm;