import React, { useState, useEffect } from 'react';
import config from '../config';
import MiniAdvert from './MiniAdvert';
import { useLocation } from 'react-router-dom';

const serverURL = config.serverURL;

function AdvertPage() {
    
    return (
        <div className="advert-page">
            <div className="advert-left-side-container">
                <div className="advert-left-side">
                    <div className="advert-image">
                        <img />
                    </div>
                    <a href="#advert-information" className="advert-link">Загальна інформація</a>
                    <a href="#advert-about" className="advert-link">Про себе</a>
                    <a href="#advert-reviews" className="advert-link">Відгуки</a>
                </div>
            </div>
            <div className="advert-right-side">
                <div className="advert-userinfo">
                    <div className="advert-username">
                        IvanFranCO
                    </div>
                    <div className="advert-email">
                        ivanfranco@gmail.com
                    </div>
                </div>
                <div id="advert-information" className="advert-information">
                    <div className="advert-information-child advert-title">
                        Математика 11 клас
                    </div>
                    <div className="advert-information-child star" style={{}}>★★★★★</div>
                    <div className="advert-information-child advert-category">
                        Математика
                    </div>
                    <div className="advert-information-child advert-category">
                        Онлайн
                    </div>
                    <div className="advert-information-child advert-category">
                        Львів, Україна
                    </div>
                    <div className="advert-information-child advert-category">
                        $10
                    </div>
                </div>
                <div id="advert-about" className="advert-about">
                    <h2>Про себе</h2>
                    <div className="advert-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </div>
                </div>
                <div id="advert-reviews" className="advert-reviews">
                    <h2>Відгуки</h2>
                </div>
            </div>
        </div>
    );
}
    
export default AdvertPage;