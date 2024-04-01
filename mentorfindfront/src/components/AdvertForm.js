import React, {useState} from 'react';

function AdvertForm() {

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const SelectAction = (e) => {
        isSelectOpen ? setIsSelectOpen(false) : setIsSelectOpen(true);
    };

    const CloseSelect = (e) => {
        if (isSelectOpen) {
            setIsSelectOpen(false);
        }
    };

    const [selectValue, setSelectValue] = useState("Тип навчання");

    const ChangeSelect = (e) => {
        setSelectValue(e.target.innerText);
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    return (
        <div className="advert-form-container">
            <div className="advert-form" onClick={CloseSelect}>
                <h2 className="title advert">Створіть оголошення</h2>
                <div className="input-field advert-long">
                    <i className="fas fa-heading" />
                    <input type="text" placeholder="Заголовок оголошення" className="title-input" />
                </div>
                <div className="input-field image">
                    <div className="drop-file" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                        {file ? <img src={URL.createObjectURL(file)} alt="Advert"/> : <i className="fa-solid fa-file-arrow-up" />}
                        <label className="custom-file-upload">
                            Виберіть <span>фото 1×1</span> для оголошення або перетягніть його сюди 
                            <input
                                type="file"
                                accept="image/*"
                                className="image-input"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="input-field advert-short">
                    <i className="fa-solid fa-list" />
                    <input type="text" placeholder="Категорія" className="location-input" />
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-map-marker-alt" />
                    <input type="text" placeholder="Локація" className="location-input" />
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-dollar-sign" />
                    <input type="number" placeholder="Ціна" className="price-input" />
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-chalkboard" />
                    <div className={isSelectOpen ? "learning-type-input open" : "learning-type-input"} onClick={SelectAction}>
                        <span style={selectValue !== "Тип навчання" ? {color: "#333"} : {}}>{selectValue}</span>
                        <div className="learning-type-options">
                            <div className="learning-type-option" onClick={ChangeSelect}>Офлайн</div>
                            <div className="learning-type-option" onClick={ChangeSelect}>Онлайн</div>
                            <div className="learning-type-option" onClick={ChangeSelect}>Змішане</div>
                        </div>
                    </div>
                </div>
                <div className="input-field advert-long description">
                    <i className="fas fa-info-circle" />
                    <textarea id="info" name="info" defaultValue={""} className="description-input" placeholder="Розкажіть про себе і свій курс" />
                </div>
                <button className="input-button" id="advert-create-btn">
                    Створити оголошенння
                </button>
            </div>
        </div>
    );
}

export default AdvertForm;