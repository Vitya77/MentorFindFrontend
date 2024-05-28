import React from 'react';
import config from '../config';

const serverURL = config.serverURL;

const types = {
    'sign': <i className="fa-solid fa-user-plus"/>
}



function Notification({id, type, sender, message, AfterDelete}) {
    const DeleteNotification = (e) => {
        e.preventDefault();
    
        fetch(`${serverURL}/appointment/del/${id}`, { //Sending a request
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                AfterDelete();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div className="notification">
            <div className="i-container">{types[type]}</div>
            <div className="info">
                <div className="sender">
                    <img src={sender.photo}/>
                    <span>{sender.username}</span>
                </div>
                <p className="text">{message}<br/><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${sender.email}`}  target="_blank">{sender.email}</a></p>
            </div>
            <button className="notification-delete" onClick={DeleteNotification}><i className="fa-regular fa-circle-xmark"/></button>
        </div>
    );
}
    
export default Notification;