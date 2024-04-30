import React, {useState} from 'react';
import config from '../config'
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';

const serverURL = config.serverURL;

const validationSchema = Yup.object().shape({ // Validation schema of all inputs
    title: Yup.string()
        .required('Обов\'язкове поле')
        .min(5, 'Назва повинна складатись щонайменше з 5 символів')
        .max(100, 'Назва повинна складатись не більше ніж зі 100 символів'),
    category: Yup.string()
        .required('Вкажіть категорію'),
    location: Yup.string()
        .required('Вкажіть локацію'),
    price: Yup.string()
        .required('Вкажіть ціну'),
    description: Yup.string()
        .max(1000, "Максимальна кількість символів - 1000")
        .required('Обов\'язкове поле'),
    type: Yup.string()
        .test('type_not_none', "Виберіть тип навчання", function (value) {
            return value !== "Тип навчання";
        }),
    image: Yup.string()
        .required('Обов\'язкове поле')
});

const AdvertForm = ({NotAuthClick, onCreating, editingMode}) => {

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const SelectAction = (e) => {
        isSelectOpen ? setIsSelectOpen(false) : setIsSelectOpen(true);
    };

    const CloseSelect = (e) => {
        if (isSelectOpen) {
            setIsSelectOpen(false);
        }
    };

    const ChangeSelect = (e) => {
        setFormData({
            ...formData,
            ['type']: e.target.innerText
        });

        validateField('type', e.target.innerText);
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

        setFormData({
            ...formData,
            ['image']: event.target.files[0]
        });

        validateField('image', event.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);

        setFormData({
            ...formData,
            ['image']: e.dataTransfer.files[0]
        });

        validateField('image', e.dataTransfer.files[0]);
    };

    const [errors, setErrors] = useState({});

    const validateField = async (name, value) => { // Function to validate field
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            setErrors({ ...errors, [name]: error.message });
        }
    };

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        location: '',
        price: '',
        description: '',
        type: 'Тип навчання',
        image: null
    });

    const [isCreated, setIsCreated] = useState(false);

    const handleDataChange = (event) => {
        var { name, value } = event.target;
        
        if (name === 'price') {
            value = parseFloat(value) ? parseFloat(value) : 0;
            if (value < 1) {
                return;
            }
        }

        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            var type_of_lesson = null;
            if (formData.type !== "Змішане") {
                type_of_lesson = formData.type === "Онлайн" ? true : false; 
            }

            const dataToSend = new FormData();
            dataToSend.append("title", formData.title);
            dataToSend.append("category", formData.category);
            dataToSend.append("price", parseFloat(formData.price).toFixed(2));
            dataToSend.append("description", formData.description);
            dataToSend.append("image", file);
            dataToSend.append("author", 1);
            dataToSend.append("location", formData.location);
            if (type_of_lesson !== null) {
                dataToSend.append("type_of_lesson", type_of_lesson)
            }

            await fetch(`${serverURL}/advert/adding-and-searching/`, { 
                method: 'POST',
                body: dataToSend,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        onCreating();
                        NotAuthClick();
                        setIsCreated(true);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            const fieldErrors = {};
            error.inner.forEach(err => {
                fieldErrors[err.path] = err.message;
            });
            setErrors(fieldErrors);
        }
    };

    if (isCreated) { 
        return <Navigate replace to="/" />;
    }
    return (
        <div className="advert-form-container">
            <div className="advert-form" onClick={CloseSelect}>
                <h2 className="title advert">{`${editingMode ? "Редагувати" : "Створіть"} оголошення`}</h2>
                <div className="input-field advert-long">
                    <i className="fas fa-heading" />
                    <input type="text" placeholder="Заголовок оголошення" className="title-input" name="title" value={formData.title} onChange={handleDataChange}/>
                    {errors.title && <span className="error-span">{errors.title}</span>}
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
                        {errors.image && <span className="error-span">{errors.image}</span>}
                    </div>
                </div>
                <div className="input-field advert-short">
                    <i className="fa-solid fa-list" />
                    <input type="text" placeholder="Категорія" className="category-input" name="category" value={formData.category} onChange={handleDataChange}/>
                    {errors.category && <span className="error-span">{errors.category}</span>}
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-map-marker-alt" />
                    <input type="text" placeholder="Локація" className="location-input" name="location" value={formData.location} onChange={handleDataChange} />
                    {errors.location && <span className="error-span">{errors.location}</span>}
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-dollar-sign" />
                    <input type="number" placeholder="Ціна" className="price-input" name="price" value={formData.price} onChange={handleDataChange}/>
                    {errors.price && <span className="error-span">{errors.price}</span>}
                </div>
                <div className="input-field advert-short">
                    <i className="fas fa-chalkboard" />
                    <div className={isSelectOpen ? "learning-type-input open" : "learning-type-input"} onClick={SelectAction}>
                        <span style={formData.type !== "Тип навчання" ? {color: "#333"} : {}}>{formData.type}</span>
                        <div className="learning-type-options">
                            <div className="learning-type-option" onClick={ChangeSelect}>Офлайн</div>
                            <div className="learning-type-option" onClick={ChangeSelect}>Онлайн</div>
                            <div className="learning-type-option" onClick={ChangeSelect}>Змішане</div>
                        </div>
                    </div>
                    {errors.type && <span className="error-span">{errors.type}</span>}
                </div>
                <div className="input-field advert-long description">
                    <i className="fas fa-info-circle" />
                    <textarea id="info" name="description" className="description-input" placeholder="Розкажіть про себе і свій курс" value={formData.description}  onChange={handleDataChange}/>
                    {errors.description && <span className="error-span">{errors.description}</span>}
                </div>
                <button className="input-button" id="advert-create-btn" onClick={handleSubmit}>
                    {`${editingMode ? "Редагувати" : "Створити"} оголошенння`}
                </button>
            </div>
        </div>
    );
}

export default AdvertForm;