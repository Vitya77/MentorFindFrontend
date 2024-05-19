import React from 'react';

function ConferentionPage() {
    return (
        <div className="conferention-page">
            <div className="user-video">
                <i className="fa-solid fa-camera"/>
                <span>Username</span>
            </div>
            <div className="conferention-panel">
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-microphone-slash"/>
                    <span>Вимкнути мікрофон</span>
                </div>
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-video"/>
                    <span>Ввімкнути камеру</span>
                </div>
                <div className="conferention-panel-item">
                    <i className="fa-solid fa-share"/>
                    <span>Поділитись</span>
                </div>
            </div>
            <div className="leave-conferention">
                <i className="fa-solid fa-right-from-bracket"/>
                <span>Вийти</span>
            </div>
        </div>
    );
}
    
export default ConferentionPage;