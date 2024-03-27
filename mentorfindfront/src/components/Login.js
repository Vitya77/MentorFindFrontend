import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '../config';

const schema = Yup.object().shape({ // Validation schema to decide if user entered email or username
  email: Yup.string().email()
});

const serverURL = config.serverURL; // Constant to save server url

const LoginForm = ({NotAuthClick, changeSuccessAuth}) => {
    /* Component of loginform. It contains for mand all logic connected with it */

    const [formData, setFormData] = useState({ // State too save user input
        usernameOrEmail: '',
        password: ''
    });

    const handleChange = (event) => { // Function that is saving user input dynamically
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [unauthorised, setUnauthorised] = useState(false); // State to check if user is authorized or not

    const handleSubmit = async (e) => { //Submitting function
        e.preventDefault();

        var isEmail = false;
        isEmail = await schema.isValid({ email: formData.usernameOrEmail }) // Checking if user entered email or username

        const dataToSend = isEmail ? JSON.stringify({ // Deciding what to send to the server whether or not user entered email
            email: formData.usernameOrEmail,
            password: formData.password
        }) : JSON.stringify({
            username: formData.usernameOrEmail,
            password: formData.password
        });

        await fetch(`${serverURL}/users/login/`, { //Sending a request
            method: 'POST',
            body: dataToSend,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) { //Checking if authorization was successful
                    return response.json();
                }
                else {
                    setUnauthorised(true);
                    return;
                }
            })
            .then(data => { 
                console.log(data.token);
                localStorage.setItem('mentorFindToken', data.token); // Setting a session token
                changeSuccessAuth();
                NotAuthClick(); // All needed events after authorization
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    if (localStorage.getItem('mentorFindToken') !== null && localStorage.getItem('mentorFindToken') !== "") { // If user is authenticated navigate to main page
        return <Navigate replace to="/" />;
    }
    return ( // If not, render the login form
        <form onSubmit={handleSubmit} method="post" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user" />
                <input 
                    type="text" 
                    placeholder="Ім'я користувача або емейл" 
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