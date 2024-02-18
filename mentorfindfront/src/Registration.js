import React, { useState } from 'react';
import './App.css';


function RegistrationForm() {
    const [formData, setFormData] = useState({
        // Створіть стан для зберігання даних форми
        username: '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const confirmPassChange = (event) => {
        const value = event.target.value;

        setConfirmPassword(value);
        setPasswordsMatch(formData.password === value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            setPasswordsMatch(value === confirmPassword);
        }
    };

    const [usernameValidateError, setUsernameValidateError] = useState('');
    const [passwordValidateError, setPasswordValidateError] = useState('');
    const [emailValidateError, setEmailValidateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);

        fetch('http://localhost:8000/users/register/', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Обробка відповіді з сервера
                console.log('Success:', data);
                if (data.username) {
                    setUsernameValidateError(data.username[0]);
                } else {
                    setUsernameValidateError('');
                }
                if (data.email) {
                    setEmailValidateError(data.email[0]);
                } else {
                    setEmailValidateError('');
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
            <h2 className="text-center">Реєстрація на курс</h2>
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
                    <label htmlFor="email">Електронна пошта:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        required=""
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {emailValidateError && (<span style={{ color: 'red' }}>{emailValidateError}</span>)}
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
                <div>
                    <label htmlFor="confirm_password">Підтвердження паролю:</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className="form-control"
                        required=""
                        value={confirmPassword}
                        onChange={confirmPassChange}
                    />
                    {!passwordsMatch && <span style={{ color: 'red' }}>Паролі не співпадають</span>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Зареєструватися
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;