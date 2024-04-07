import React from 'react';
import config from '../config';

const serverURL = config.serverURL;

function Review() {
    
    return (
        <div className="review">
            <div className="review-username">
                IvanFranCo
            </div>
            <div className="star">★★★★★</div>
            <div className="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </div>
        </div>
    );
}
    
export default Review;