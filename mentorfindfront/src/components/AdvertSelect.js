import React, {useState} from 'react';

function AdvertSelect() {

    const [isSelected, setIsSelected] = useState(false);

    const Select = (e) => {
        e.preventDefault();
        setIsSelected(true);
    }

    const UnSelect = (e) => {
        e.preventDefault();
        setIsSelected(false);
    }

    return (
        isSelected ? <i className="fa-solid fa-heart" onClick={UnSelect}/> : <i className="fa-regular fa-heart" onClick={Select}/>  
    );
}
    
export default AdvertSelect;