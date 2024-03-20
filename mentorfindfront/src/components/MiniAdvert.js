import React, { useState } from 'react';
import config from '../config';

const serverURL = config.serverURL;

function MiniAdvert({title, rating, price, location, type, description, category}) {

    const ratingStyle = {
        '--rating': rating
    };

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
            <div className="mini-teacher-photo"></div>
            <h3 className="mini-title">{title}</h3>
            <div className="mini-rating">
                <div className="star" style={ratingStyle}>★★★★★</div>
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