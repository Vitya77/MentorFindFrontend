import React, {useState, useEffect} from 'react';
import LogoBlue from "../img/logo_blue.svg";
import MiniAdvert from './MiniAdvert';
import config from '../config';
import {CustomCreateURL} from '../useful';
import * as Yup from 'yup';

const serverURL = config.serverURL;

const validationSchema = Yup.object().shape({ // Validation schema of all inputs
    username: Yup.string()
        .required("Це поле є обов'язковим")
        .min(5, 'Ім\'я користувача повинно містити щонайменше 5 символів'),
    email: Yup.string()
        .required("Це поле є обов'язковим")
        .email('Введіть коректну електронну адресу'),
    password: Yup.string()
        .required("Введіть пароль, щоб змінити профіль"),
    
});

const validationSchemaForNewPassword = Yup.object().shape({
    newPassword: Yup.string()
        .notRequired()
        .min(8, 'Пароль повинен містити щонайменше 8 символів')
        .test('is_uppercase', 'Пароль повинен містити велику літеру', function (value) {
            return value.toLowerCase() !== value
        })
});

function ProfilePage({onCreating}) {

    const [editUserState, setEditUserState] = useState(false);

    const changeToEditUser = () => {
        setEditUserState(true);
    }

    const changeToNonEditUser = () => {
        setEditUserState(false);
    }

    const [userData, setUserData] = useState({
        "photo": LogoBlue,
        "username": "",
        "email": ""
    });

    const [changedUserData, setChangedUserData] = useState({
        username: '',
        email: '',
        photo: null,
        password: '',
        newPassword: ''
    });

    const GetUserData = () => {
        fetch(`${serverURL}/users/getViaToken/`, { //Sending a request
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              setUserData(data);
              setChangedUserData({
                username: data.username,
                email: data.email,
                photo: data.photo,
                password: '',
                newPassword: ''
              });
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    useEffect(GetUserData, []);

    const [selectedAdvertsData, setSelectedAdvertsData] = useState([]);
    
    const GetSelectedAdverts = () => {
        fetch(`${serverURL}/selected/getSelectAd/`, { //Sending a request
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              setSelectedAdvertsData(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    const [refreshSelected, setRefreshSelected] = useState(0);

    useEffect(() => {
        GetSelectedAdverts();
      }, [refreshSelected]);

    const [viewHistoryData, setViewHistoryData] = useState([]);

    const GetViewHistory = () => {
        fetch(`${serverURL}/viewhistory/getlist`, { //Sending a request
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              setViewHistoryData(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    const [refreshViewHistory, setRefreshViewHistory] = useState(0);

    useEffect(() => {
        GetViewHistory();
      }, [refreshViewHistory]);

    const ClearViewHistory = () => {
        fetch(`${serverURL}/viewhistory/del-full-viewhistory/`, { //Sending a request
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              if (response.status === 204) {
                setRefreshViewHistory((refreshViewHistory + 1)%2);
              }
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    const [createdAdvertsData, setCreatedAdvertsData] = useState([]);

    const GetCreatedAdverts = () => {
        fetch(`${serverURL}/advert/get-for-author/`, { //Sending a request
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              setCreatedAdvertsData(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    useEffect(() => {
        GetCreatedAdverts();
      }, []);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => { // Function that is saving user input dynamically and checking validation
        const { name, value } = event.target;

        setChangedUserData({
            ...changedUserData,
            [name]: value
        });

        if (name === "newPassword") {
            validateNewPassword(value);
        }
        else {validateField(name, value);}
    };

    const handleAvatarChange = (event) => {
        setChangedUserData({
            ...changedUserData,
            ['photo']: event.target.files[0]
        });
    }

    const validateField = async (name, value) => { // Function to validate field
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            setErrors({ ...errors, [name]: error.message });
        }
    };

    const validateNewPassword = async (value) => {
        try {
            await Yup.reach(validationSchemaForNewPassword, "newPassword").validate(value);
            setErrors({ ...errors, ["newPassword"]: '' });
        } catch (error) {
            setErrors({ ...errors, ["newPassword"]: error.message });
        }
    }

    const EditUser = async () => {
        if (userData.username === changedUserData.username && userData.email === changedUserData.email && userData.photo === changedUserData.photo && changedUserData.newPassword === '') {
            changeToNonEditUser();
            return;
        }

        try {
            await validationSchema.validate(changedUserData, { abortEarly: false });
            changedUserData.newPassword !== '' && await validationSchemaForNewPassword.validate(changedUserData, { abortEarly: false }); // Validating fields, and if validation is not correct throw exception

            const dataToSend = new FormData();
            userData.username !== changedUserData.username && dataToSend.append("username", changedUserData.username);
            userData.email !== changedUserData.username && dataToSend.append("email", changedUserData.email);
            dataToSend.append("current_password", changedUserData.password);
            changedUserData.newPassword !== '' && dataToSend.append("password", changedUserData.newPassword);
            userData.photo !== changedUserData.photo && dataToSend.append("photo", changedUserData.photo);

            await fetch(`${serverURL}/users/edit/`, { //Sending a request
                method: 'PATCH',
                body: dataToSend,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
                }
            })
                .then(response => {
                    if (response.status === 200) { // Checking if registration was successful
                        return response.json()
                    }
                    else {
                        return;
                    }
                })
                .then(data => {
                    console.log('Success:', data);
                    changeToNonEditUser();
                    GetUserData();
                    onCreating("Ви успішно відредагували профіль!");
                    // All needed events after authorization
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.log(error); // If validation is not correct change errors text
            const fieldErrors = {};
            error.inner.forEach(err => {
                fieldErrors[err.path] = err.message;
            });
            setErrors(fieldErrors);
        }
    }

    return (
        <div className="profile-page-container">
            <div className="profile-background"></div>
            <div className="profile-page">
                <div className="profile-page-nav-container">
                    <div className="profile-page-nav">
                        <a href="#profile-info" className="profile-link"><i className="fa-solid fa-user" />Профіль</a>
                        <a href="#profile-created-advert" className="profile-link"><i className="fa-solid fa-file-invoice"/>Створені оголошення</a>
                        <a href="#profile-selected-advert" className="profile-link"><i className="fa-solid fa-heart"/>Вибрані</a>
                        <a href="#profile-history-advert" className="profile-link"><i className="fa-solid fa-clock-rotate-left"/>Історія перегляду</a>
                    </div>
                </div>
                <div className="profile-page-content">
                    <div className={`profile-info ${editUserState ? "edit" : ""}`} id="profile-info">
                        <div className="profile-image-container">
                            <img src={CustomCreateURL(changedUserData.photo)} alt="Avatar"/>
                            {editUserState && <label><i className="fa-solid fa-pen"></i><input type="file" accept="image/*" onChange={handleAvatarChange}></input></label>}
                        </div>
                        <div className="profile-user">
                            <div className={`profile-username ${editUserState ? "edit" : ""}`} id="profile">
                                {editUserState ? <input 
                                    type="text" 
                                    placeholder="Ім'я користувача" 
                                    name="username"  
                                    value= {changedUserData.username}
                                    onChange={handleChange}
                                /> : userData.username}
                                {errors.username && editUserState && <span className="error-span">{errors.username}</span>}
                            </div>
                            <div className="profile-email">
                                {editUserState ? <input 
                                    type="text" 
                                    placeholder="Емейл" 
                                    name="email"  
                                    value={changedUserData.email} 
                                    onChange={handleChange}
                                /> : userData.email}
                                {errors.email && editUserState && <span className="error-span">{errors.email}</span>}
                            </div>
                        </div>
                        {editUserState && 
                            <div className="profile-password-edit">
                                <div className={`profile-username ${editUserState ? "edit" : ""}`}>
                                    <input 
                                        type="password" 
                                        placeholder="Теперішній пароль" 
                                        name="password"  
                                        value={changedUserData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <span className="error-span">{errors.password}</span>}
                                </div>
                                <div className="profile-email">
                                    <input 
                                        type="password" 
                                        placeholder="Новий пароль" 
                                        name="newPassword"  
                                        value={changedUserData.newPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.newPassword && <span className="error-span">{errors.newPassword}</span>}
                                </div>
                            </div>
                        }
                        <div className="profile-user-edit-container">
                            <button className="profile-user-edit" onClick={editUserState ? EditUser : changeToEditUser}>{editUserState ? <span><i className="fa-solid fa-cloud-arrow-up" /> Зберегти зміни</span> : <i className="fa-solid fa-user-pen" />}</button>
                        </div>
                        {editUserState && <button className="profile-user-editing-off" onClick={changeToNonEditUser}><i className="fa-solid fa-xmark"/></button>}
                    </div>
                    <div className="profile-category" id="profile-created-advert">
                        <i className="fa-solid fa-file-invoice"/>
                        <h1 className="profile-category-title">Створені оголошення</h1>
                        <div className="profile-bar"></div>
                        <div className="profile-advert-container">
                            {createdAdvertsData.map(dictionary => (
                                <MiniAdvert advert_id={dictionary.id} image={dictionary.image} title={dictionary.title} rating={dictionary.average_rating ? dictionary.average_rating : 0} price={dictionary.price} location={dictionary.location} type={dictionary.type_of_lesson} description={dictionary.description} category={dictionary.category} showEdit={true}/>
                            ))}
                            {createdAdvertsData.length === 0 && <span className="no-adverts-message">Ви ще не створили жодного оголошення</span>}
                        </div>
                    </div>
                    <div className="profile-category" id="profile-selected-advert">
                        <i className="fa-solid fa-heart"/>
                        <h1 className="profile-category-title"> Вибрані оголошення</h1>
                        <div className="profile-bar"></div>
                        <div className="profile-advert-container">
                            {selectedAdvertsData.map(dictionary => (
                                <MiniAdvert refreshing={refreshSelected} setRefreshing={setRefreshSelected} advert_id={dictionary.id} image={dictionary.image} title={dictionary.title} rating={dictionary.average_rating ? dictionary.average_rating : 0} price={dictionary.price} location={dictionary.location} type={dictionary.type_of_lesson} description={dictionary.description} category={dictionary.category} showHeart={true} isSelected={true}/>
                            ))}
                            {selectedAdvertsData.length === 0 && <span className="no-adverts-message">Немає вибраних оголошень</span>}
                        </div>
                    </div>
                    <div className="profile-category" id="profile-history-advert">
                        <i className="fa-solid fa-clock-rotate-left"/>
                        <h1 className="profile-category-title"> Історія переглядів</h1>
                        <div className="profile-bar"></div>
                        <div className="profile-advert-container">
                            {viewHistoryData.map(dictionary => (
                                <MiniAdvert advert_id={dictionary.advertisement.id} image={dictionary.advertisement.image} title={dictionary.advertisement.title} rating={dictionary.advertisement.average_rating ? dictionary.advertisement.average_rating : 0} price={dictionary.advertisement.price} location={dictionary.advertisement.location} type={dictionary.advertisement.type_of_lesson} description={dictionary.advertisement.description} category={dictionary.advertisement.category} showHeart={true} isSelected={dictionary.advertisement.is_saved}/>
                            ))}
                        </div>
                        {viewHistoryData.length === 0 ? <span className="no-adverts-message">Історія перегляду порожня</span> : <button className="btn clear-history-button" onClick={ClearViewHistory}>Очистити історію</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default ProfilePage;