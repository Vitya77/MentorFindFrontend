import React from 'react';
import config from '../config';

const serverURL = config.serverURL;

function Review({author_username, rating, text, animation}) {
    
    return (
        <div className={`review ${animation ? 'animation' : ''}`}>
            <div className="review-username">
                {author_username}
            </div>
            <div>
                <div className="star" style={{'--rating': `${rating/5*100}%`}}>★★★★★</div>
            </div>
            <div className="review-text">
                {text}
            </div>
        </div>
    );
}
    
export default Review;