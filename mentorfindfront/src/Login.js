import React, { useState } from 'react';
import './App.css';


const LoginForm = ({ switchToRegistration }) => {
    const [formData, setFormData] = useState({
        // Створіть стан для зберігання даних форми
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [usernameValidateError, setUsernameValidateError] = useState('');
    const [passwordValidateError, setPasswordValidateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Обробка відповіді з сервера
                if (data.username) {
                    setUsernameValidateError(data.username[0]);
                } else {
                    setUsernameValidateError('');
                }
                if (data.password) {
                    setPasswordValidateError(data.password[0]);
                } else {
                    setPasswordValidateError('');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">Вхід на курс</h2>
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label htmlFor="username">Ім'я користувача:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        required=""
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {usernameValidateError && (<span style={{ color: 'red' }}>{usernameValidateError}</span>)}
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        required=""
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {passwordValidateError && (<span style={{ color: 'red' }}>{passwordValidateError}</span>)}
                </div>
                <button type="submit" className="btn_btn-primary">
                    Увійти
                </button>
            </form>
            <a className="register-link" onClick={switchToRegistration}>
                Зареєструватися
            </a>
        </div>
    );
}

export default LoginForm;