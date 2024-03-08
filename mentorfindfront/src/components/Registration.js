import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '../config'

const serverURL = config.serverURL; // Constant to save server url

const validationSchema = Yup.object().shape({ // Validation schema of all inputs
    username: Yup.string()
        .required('Ім\'я користувача є обов\'язковим')
        .min(5, 'Ім\'я користувача повинно містити щонайменше 5 символів'),
    email: Yup.string()
        .email('Введіть коректну електронну адресу')
        .required('Електронна адреса є обов\'язковою'),
    password: Yup.string()
        .required('Пароль є обов\'язковим')
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .test('is_uppercase', 'Пароль повинен містити велику літеру', function (value) {
            return value.toLowerCase() !== value
        }),
    confirmPassword: Yup.string()
        .required('Підтвердження паролю є обов\'язковим')
});

const RegistrationForm = ({NotAuthClick, changeSuccessAuth}) => {
    /* Component of registration form */

    const [formData, setFormData] = useState({ // State too save user input
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // State to save validation errors

    const handleChange = (event) => { // Function that is saving user input dynamically and checking validation
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    const validateField = async (name, value) => { // Function to validate field
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            setErrors({ ...errors, [name]: error.message });
        }
    };

    const handleSubmit = async (e) => { //Submitting function
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false }); // Validating fields, and if validation is not correct throw exception

            if (formData.password !== formData.confirmPassword) { // Checking if confirmation of password is the same as password
                return;
            }

            const dataToSend = JSON.stringify( // Formation of what data to send to the server
                {
                    "username": formData.username,
                    "email": formData.email,
                    "password": formData.password
                }
            );

            await fetch(`${serverURL}/users/register/`, { //Sending a request
                method: 'POST',
                body: dataToSend,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201) { // Checking if registration was successful
                        return response.json()
                    }
                    else {
                        return;
                    }
                })
                .then(data => {
                    console.log('Success:', data);
                    localStorage.setItem('mentorFindToken', data.token); // Setting a session token
                    changeSuccessAuth();
                    NotAuthClick();// All needed events after authorization
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) { // If validation is not correct change errors text
            const fieldErrors = {};
            error.inner.forEach(err => {
                fieldErrors[err.path] = err.message;
            });
            setErrors(fieldErrors);
        }
    };

    if (localStorage.getItem('mentorFindToken') !== null && localStorage.getItem('mentorFindToken') !== "") { // If user is authenticated navigate to main page
        return <Navigate replace to="/" />;
    }
    return ( // If not, render the registration form
        <form onSubmit={handleSubmit} method="post" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <i className="fas fa-user" />
                <input 
                    type="text" 
                    placeholder="Ім'я користувача" 
                    id="up-username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}    
                />
            </div>
            {errors.username && <span className="error-span">{errors.username}</span>}
            <div className="input-field">
                <i className="fas fa-envelope" />
                <input 
                    type="email" 
                    placeholder="Електронна пошта"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} 
                />
            </div>
            {errors.email && <span className="error-span">{errors.email}</span>}
            <div className="input-field">
                <i className="fas fa-lock" />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    id="up-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            {errors.password && <span className="error-span">{errors.password}</span>}
            <div className="input-field">
                <i className="fas fa-lock" />
                <input 
                    type="password" 
                    placeholder="Підтвердження паролю" 
                    id="confirm_password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            {errors.confirmPassword && <span className="error-span">{errors.confirmPassword}</span>}
            {!(formData.confirmPassword === formData.password || formData.confirmPassword === '') && <span className="error-span">Паролі не співпадають</span>}
            <input type="submit" className="btn" defaultValue="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
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

export default RegistrationForm;