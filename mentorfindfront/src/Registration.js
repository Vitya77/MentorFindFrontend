import React, { useState } from 'react';
import './App.css';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Ім\'я користувача є обов\'язковим')
        .min(5, 'Ім\'я користувача повинно містити щонайменше 5 символи'),
    email: Yup.string()
        .email('Введіть коректну електронну адресу')
        .required('Електронна адреса є обов\'язковою'),
    password: Yup.string()
        .required('Пароль є обов\'язковим')
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .test('is_uppercase', 'Пароль повинен містити велику літеру', function (value) {
            return value.toLowerCase() !== value
        }),
});

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const confirmPassChange = (event) => {
        const value = event.target.value;

        setConfirmPassword(value);
        setPasswordsMatch(formData.password === value || value === null);
    };


    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);

        if (name === 'password') {
            setPasswordsMatch(value === confirmPassword || confirmPassword === '');
        }
    };

    const validateField = async (name, value) => {
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            setErrors({ ...errors, [name]: error.message });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            
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
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            const fieldErrors = {};
            error.inner.forEach(err => {
                fieldErrors[err.path] = err.message;
            });
            setErrors(fieldErrors);
        }
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
                    {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
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
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
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
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="confirm_password">Підтвердження паролю:</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirmPassword"
                        className="form-control"
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