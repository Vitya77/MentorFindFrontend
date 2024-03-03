import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '../config'

const schema = Yup.object().shape({
  email: Yup.string().email()
});

const serverURL = config.serverURL;

const LoginForm = () => {
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
                if (response.status === 401) {
                    setUnauthorised(true);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.token);
                localStorage.setItem('mentorFindToken', data.token);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        window.location.reload();
    };


    if (localStorage.getItem('mentorFindToken') !== null) {
        return <Navigate replace to="/" />;
    }
    return (
        <div className="container">
            <div className="simple-form">
            <h2 className="text-center">Вхід в систему</h2>
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label className="form-label" htmlFor="username">Ім'я користувача або емейл:</label>
                    <input
                        type="text"
                        id="username"
                        name="usernameOrEmail"
                        className="form-control"
                        required=""
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                    />
                    {unauthorised && (<span style={{ color: 'red' }}>Неправильно введене ім'я користувача, емейл або пароль</span>)}
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        required=""
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {unauthorised && (<span style={{ color: 'red' }}>Неправильно введене ім'я, емейл користувача або пароль</span>)}
                </div>
                <button type="submit" className="btn_btn-primary">
                    Увійти
                </button>
            </form>
            <Link to="/registration" className="register-link">
                Зареєструватися
            </Link>
            </div>
        </div>
    );
}

export default LoginForm;