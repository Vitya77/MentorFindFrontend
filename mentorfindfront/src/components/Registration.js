import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '../config'
import WomenAvatar from '../img/women-avatar.webp'
import MenAvatar from '../img/men-avatar.webp'

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
        image: null,
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

            const dataToSend = new FormData();
            dataToSend.append("username", formData.username);
            dataToSend.append("email", formData.email);
            dataToSend.append("password", formData.password);
            formData.image !== null && dataToSend.append("photo", formData.image);

            await fetch(`${serverURL}/users/register/`, { //Sending a request
                method: 'POST',
                body: dataToSend,
                headers: {
                    
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

    const [isAvatarHovered, setIsAvatarHovered] = useState(false);

    const AvatarHover = () => {
        setIsAvatarHovered(true);
    }

    const AvatarUnhover = () => {
        setIsAvatarHovered(false);
    }

    const handleAvatarChange = (event) => {
        setFormData({
            ...formData,
            ['image']: event.target.files[0]
        });
        setIsWomenSelected(false);
        setIsMenSelected(false);
    };

    const [isWomenSelected, setIsWomenSelected] = useState(false);
    const [isMenSelected, setIsMenSelected] = useState(false);

    const handleStandartAvatarChange = (event) => {
        const src = event.target.src;
        if (src.includes('women-avatar')) {
            setIsWomenSelected(true);
            setIsMenSelected(false);
        }
        else if (src.includes('men-avatar')) {
            setIsMenSelected(true);
            setIsWomenSelected(false);
        }
        fetch(src)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "standart_avatar.jpg", { type: blob.type });
                setFormData({
                    ...formData,
                    ['image']: file
                });
            })
            .catch(error => console.error('Error fetching image file:', error));
    };

    if (localStorage.getItem('mentorFindToken') !== null && localStorage.getItem('mentorFindToken') !== "") { // If user is authenticated navigate to main page
        return <Navigate replace to="mentorfind/" />;
    }
    return ( // If not, render the registration form
        <form onSubmit={handleSubmit} method="post" className="sign-up-form">
            <div className="avatar-input" onMouseEnter={AvatarHover} onMouseLeave={AvatarUnhover}>
                <div className={`standart-avatar women-avatar ${isWomenSelected && "selected"}`}>
                    <img src={WomenAvatar} onClick={handleStandartAvatarChange}/>
                </div>
                <div className="avatar-container">
                    <label className="avatar-upload">
                        {formData.image && formData.image.name !== "standart_avatar.jpg" ? <img src={URL.createObjectURL(formData.image)} /> : (isAvatarHovered ? <i className="fa-solid fa-file-import"/> : <i className="fa-solid fa-camera"/>)}
                        <input
                            type="file"
                            accept="image/*"
                            className="image-input"
                            onChange={handleAvatarChange}
                        />
                    </label> 
                </div>
                <div className={`standart-avatar men-avatar ${isMenSelected && "selected"}`} >
                    <img src={MenAvatar} onClick={handleStandartAvatarChange}/>
                </div>
            </div>
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
            <p className="social-text">Або зареєструйтесь за допомогою соціальних мереж</p>
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