import React, {useState} from 'react';
import config from '../config';

const serverURL = config.serverURL;

function AdvertSelect({refreshing, setRefreshing, advert_id, is_selected}) {

    const [isSelected, setIsSelected] = useState(is_selected);

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

          })
          .catch((error) => {
              console.error('Error:', error);
          });

        try {setRefreshing((refreshing + 1) % 2);}
        catch {}
    }

    return (
        isSelected ? <i className="fa-solid fa-heart" onClick={UnSelect}/> : <i className="fa-regular fa-heart" onClick={Select}/>  
    );
}
    
export default AdvertSelect;