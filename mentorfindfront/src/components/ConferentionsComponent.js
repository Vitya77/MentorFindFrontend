import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ConferentionsComponent() {
    const [isInputIdActive, setIsInputIdActive] = useState(false);

    const ActivateInput = () => {
        setIsInputIdActive(true);
    }

    const DeactivateInput = () => {
        setIsInputIdActive(false);
    }

    return (
        <div className="conferentions-container">
            <div className="conferention-button" onClick={ActivateInput}>
                <i className="fa-solid fa-video"/>
                <span>Приєднатись</span>
            </div>
            <Link to="/MentorFindFront/conferention/conferention_id" className="conferention-button">
                <i className="fa-solid fa-plus"/>
                <span>Почати конференцію</span>
            </Link>
            {isInputIdActive && <div className="conf-id-input">
                <span>Введіть id конференції: </span>
                <input type="text" placeholder="Id конференції"></input>
                <div className="buttons">
                    <div className="conf-id-button" onClick={DeactivateInput}>Скасувати</div>
                    <Link to="/MentorFindFront/conferention/conferention_id" className="conf-id-button">Приєднатись</Link>
                </div>
            </div>}
        </div>
    );
}
    
export default ConferentionsComponent;