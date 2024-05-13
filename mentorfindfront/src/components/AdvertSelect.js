import React, {useState} from 'react';
import config from '../config';

const serverURL = config.serverURL;

function AdvertSelect({refreshing, setRefreshing, advert_id}) {

    const [isSelected, setIsSelected] = useState(false);

    const Select = (e) => {
        e.preventDefault();
        setIsSelected(true);

        fetch(`${serverURL}/selected/`, { //Sending a request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            },
            body: JSON.stringify({
                'advertisement': advert_id
            })
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              console.log(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    const UnSelect = async (e) => {
        e.preventDefault();
        setIsSelected(false);

        await fetch(`${serverURL}/selected/del/${advert_id}`, { //Sending a request
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
          })
          .then(response => {
              return response.json();
          })
          .then(data => { 
              console.log(data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });

        setRefreshing((refreshing + 1) % 2);
    }

    return (
        isSelected ? <i className="fa-solid fa-heart" onClick={UnSelect}/> : <i className="fa-regular fa-heart" onClick={Select}/>  
    );
}
    
export default AdvertSelect;