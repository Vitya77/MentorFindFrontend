import React, { useState } from 'react';
import config from '../config';

const serverURL = config.serverURL;

function MiniAdvert({title, image, rating, price, location, type, description, category}) {

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

    return (
        <div className="mini-advert">
            <div className="mini-teacher-photo">
                <img src={image} />
            </div>
            <h3 className="mini-title">{title}</h3>
            <div className="mini-rating">
                <div className="star" style={{'--rating': `${rating/5 * 100}%`}}>★★★★★</div>
            </div>
            <div className="mini-category">${price}</div>
            <div className="mini-category">{location}</div>
            <div className="mini-category">{whatType(type)}</div>
            <div className="mini-category">{category}</div>
            <div className="mini-description">{description}</div>
        </div>
    );
}
    
export default MiniAdvert;