import React, {useState, useEffect} from 'react';
import LogoBlue from "../img/logo_blue.svg";
import MiniAdvert from './MiniAdvert';
import config from '../config';

const serverURL = config.serverURL;

function ProfilePage() {

    const [editUserState, setEditUserState] = useState(false);

    const changeToEditUser = () => {
        setEditUserState(true);
    }

    const changeToNonEditUser = () => {
        setEditUserState(false);
    }

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
                            <img src={LogoBlue} alt="Avatar"/>
                            {editUserState && <label><i className="fa-solid fa-pen"></i><input type="file" accept="image/*"></input></label>}
                        </div>
                        <div className="profile-user">
                            <div className="profile-username">
                                {editUserState ? <input 
                                    type="text" 
                                    placeholder="Ім'я користувача" 
                                    name="username"  
                                    value="IvanFranCO" 
                                /> : "IvanFranCO"}
                            </div>
                            <div className="profile-email">
                                {editUserState ? <input 
                                    type="text" 
                                    placeholder="Емейл" 
                                    name="email"  
                                    value="ivanfran@gmail.com" 
                                /> : "ivanfran@gmail.com"}
                            </div>
                        </div>
                        {editUserState && 
                            <div className="profile-password-edit">
                                <div className="profile-username">
                                    <input 
                                        type="text" 
                                        placeholder="Теперішній пароль" 
                                        name="present_password"  

                                    />
                                </div>
                                <div className="profile-email">
                                    <input 
                                        type="text" 
                                        placeholder="Новий пароль" 
                                        name="new_password"  

                                    />
                                </div>
                            </div>
                        }
                        <div className="profile-user-edit-container">
                            <button className="profile-user-edit" onClick={editUserState ? changeToNonEditUser : changeToEditUser}>{editUserState ? <span><i className="fa-solid fa-cloud-arrow-up" /> Зберегти зміни</span> : <i className="fa-solid fa-user-pen" />}</button>
                        </div>
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