import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import AdvertSelect from './AdvertSelect';

function MiniAdvert({refreshing, setRefreshing, advert_id, title, image, rating, price, location, type, description, category, showHeart, showEdit, isSelected}) {

    function whatType(type) {
        if (type === null) {
            return "Онлайн/Офлайн";
        }
        else if (type === true) {
            return "Онлайн";
        }
        else if (type === false) {
            return "Офлайн";
        }
    }

    const [isEdit, setIsEdit] = useState(false);

    const LinkToEdit = (e) => {
        e.preventDefault();
        setIsEdit(true);
    }

    return isEdit ? (<Navigate replace to={`/advertform/edit/${advert_id}`} />) : (
        <Link to={`/advert/${advert_id}`} className={`mini-advert ${showHeart ? "show-heart": ""} ${showEdit ? "show-edit" : ""}`}>
            <div className="mini-teacher-photo">
                <img src={image} alt="Avatar"/>
            </div>
            <h3 className="mini-title">{title}</h3>
            <div className="mini-rating">
                <div className="star" style={{'--rating': `${rating/5 * 100}%`}}>★★★★★</div>
            </div>
            {showHeart && <AdvertSelect refreshing={refreshing} setRefreshing={setRefreshing} advert_id={advert_id} is_selected={isSelected}/>}
            {showEdit && <i className="fa-solid fa-pencil" onClick={LinkToEdit}/>}
            <div className="mini-category">${price}</div>
            <div className="mini-category">{location}</div>
            <div className="mini-category">{whatType(type)}</div>
            <div className="mini-category">{category}</div>
            <div className="mini-description">{description}</div>
        </Link>
    );
}
    
export default MiniAdvert;