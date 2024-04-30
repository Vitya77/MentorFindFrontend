import React, {useState} from 'react';
import LogoBlue from "../img/logo_blue.svg";
import MiniAdvert from './MiniAdvert';

function ProfilePage() {

    const [editUserState, setEditUserState] = useState(false);

    const changeToEditUser = () => {
        setEditUserState(true);
    }

    const changeToNonEditUser = () => {
        setEditUserState(false);
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
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showEdit={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showEdit={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showEdit={true}/>
                            
                        </div>
                    </div>
                    <div className="profile-category" id="profile-selected-advert">
                        <i className="fa-solid fa-heart"/>
                        <h1 className="profile-category-title"> Вибрані оголошення</h1>
                        <div className="profile-bar"></div>
                        <div className="profile-advert-container">
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            
                        </div>
                    </div>
                    <div className="profile-category" id="profile-history-advert">
                        <i className="fa-solid fa-clock-rotate-left"/>
                        <h1 className="profile-category-title"> Історія переглядів</h1>
                        <div className="profile-bar"></div>
                        <div className="profile-advert-container">
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            <MiniAdvert image={LogoBlue} title="Математика" rating={0} price={100} location={"Львів"} type={false} description={"Дуже чудове репетиторство"} category={"Математика"} showHeart={true}/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default ProfilePage;