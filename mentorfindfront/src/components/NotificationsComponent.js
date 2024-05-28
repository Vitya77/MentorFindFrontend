import React, {useState, useEffect} from 'react';
import config from '../config';
import Notification from './Notification';

const serverURL = config.serverURL;

function NotificationsComponent() {

    const [messagesAboutSigns, setMessagesAboutSigns] = useState([]);

    const GetMessagesAboutSigns = () => {
        fetch(`${serverURL}/appointment/getList/`, { //Sending a request
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            setMessagesAboutSigns(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const [refreshingMessages, setRefreshingMessages] = useState(0);

    useEffect(GetMessagesAboutSigns, [refreshingMessages]);

    const AfterDelete = () => {
        setRefreshingMessages((refreshingMessages + 1)%2);
    }

    return (
        <div className="notifications-container">
            {messagesAboutSigns.map(notification => {
                return <Notification id={notification.id} type="sign" sender={notification.student} message={notification.text} AfterDelete={AfterDelete} />
            })}
            {messagesAboutSigns.length === 0 && 
                <div className="no-messages">
                    Сповіщень немає
                </div>
            }
        </div>
    );
}
    
export default NotificationsComponent;