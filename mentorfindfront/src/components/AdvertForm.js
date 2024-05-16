import React, {useState, useEffect} from 'react';
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

        setChangedData({
            ...changedData,
            ['type']: true
        });

        validateField('type', e.target.innerText);
    };

    function CustomCreateURL(url_or_file) {
        try {
            return URL.createObjectURL(url_or_file);
        }
        catch {
            return url_or_file;
        }
    }

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            ['image']: event.target.files[0]
        });

        setChangedData({
            ...changedData,
            ['image']: true
        });

        validateField('image', event.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            ['image']: e.dataTransfer.files[0]
        });

        setChangedData({
            ...changedData,
            ['image']: true
        });

        validateField('image', e.dataTransfer.files[0]);
    };

    const [errors, setErrors] = useState({});

    const validateField = async (name, value) => { // Function to validate field
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            await setErrors({ ...errors, [name]: error.message });
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

    const [changedData, setChangedData] = useState({
        title: false,
        category: false,
        location: false,
        price: false,
        description: false,
        type: false,
        image: false
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

        setChangedData({
            ...changedData,
            [name]: true
        });

        validateField(name, value);
    };

    const [isEdited, setIsEdited] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            var type_of_lesson = null;
            if (formData.type !== "Змішане") {
                type_of_lesson = formData.type === "Онлайн" ? true : false; 
            }

            const dataToSend = new FormData();
            changedData.title && dataToSend.append("title", formData.title);
            changedData.category && dataToSend.append("category", formData.category);
            changedData.price && dataToSend.append("price", parseFloat(formData.price).toFixed(2));
            changedData.description && dataToSend.append("description", formData.description);
            changedData.image && dataToSend.append("image", formData.image);
            changedData.location && dataToSend.append("location", formData.location);
            if (type_of_lesson !== null) {
                changedData.type && dataToSend.append("type_of_lesson", type_of_lesson)
            }

            await fetch(editingMode ? `${serverURL}/advert/edit/${IdOfAdvert}/` : `${serverURL}/advert/adding-and-searching/`, { 
                method: editingMode ? 'PATCH' : 'POST',
                body: dataToSend,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
                }
            })
                .then(response => {
                    if (editingMode && response.status === 200) {
                        onCreating("Ви успішно відредагували оголошення!");
                        NotAuthClick();
                        setIsEdited(true);
                    }
                    else if (!editingMode && response.status === 201) {
                        onCreating("Ви успішно створили оголошення!");
                        NotAuthClick();
                        setIsCreated(true);
                    }
                    else if (response.status === 403) {
                        setErrors({
                            ...errors,
                            ['request']: "Ви не можете редагувати це оголошення"
                        });
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

    const [isDescrGenerating, setIsDescrGenerating] = useState(false);

    const generateText = async () => {

        if (formData.title === '' ?? formData.category === '' ?? formData.location === '' ?? formData.price < 1 ?? formData.type === 'Тип навчання') {
            setErrors({
                ...errors, 
                ['title']: 'Вкажіть це поле',
                ['location']: 'Вкажіть це поле',
                ['category']: 'Вкажіть це поле',
                ['price']: 'Вкажіть це поле',
                ['type']: 'Вкажіть це поле',
            });
            return;
        }

        setFormData({
            ...formData,
            ['description']: ''
        });
        setIsDescrGenerating(true);

        fetch(`${serverURL}/ai/getText/?c=Придумай опис до оголошення про репетиторство в населеному пункті ${formData.location} з заголовком ${formData.title} з категорії ${formData.category} і з типом навчання ${formData.type} та ціною ${formData.price}`, { 
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                setIsDescrGenerating(false);
                setFormData({
                    ...formData,
                    ['description']: data.content
                });
                setChangedData({
                    ...changedData,
                    ['description']: true
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const [isImageGenerating, setIsImageGenerating] = useState(false);

    const [generatedImages, setGeneratedImages] = useState([]);

    const generateImage = async () => {

        if (formData.title === '' ?? formData.category === '' ?? formData.location === '' ?? formData.price < 1 ?? formData.type === 'Тип навчання') {
            setErrors({
                ...errors, 
                ['title']: 'Вкажіть це поле',
                ['location']: 'Вкажіть це поле',
                ['category']: 'Вкажіть це поле',
                ['price']: 'Вкажіть це поле',
                ['type']: 'Вкажіть це поле',
            });
            return;
        }

        setFormData({
            ...formData,
            ['image']: null
        });

        setIsImageGenerating(true);

        fetch(`${serverURL}/ai/getPhoto/?p=Згенеруй фон для оголошення про репетиторство в населеному пункті ${formData.location} з заголовком ${formData.title} з категорії ${formData.category} і з типом навчання ${formData.type} та ціною ${formData.price}`, { 
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                setIsImageGenerating(false);

                function dataURItoFile(dataURI, filename) {
                    // Розділення строки на частини
                    let arr = dataURI.split(','), 
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), 
                        n = bstr.length, 
                        u8arr = new Uint8Array(n);
                        
                    // Перетворення бінарної строки у масив байтів
                    while(n--) {
                      u8arr[n] = bstr.charCodeAt(n);
                    }
                  
                    // Створення файлу
                    return new File([u8arr], filename, {type:mime});
                  }
                  
                let files = [];
                  // Використання функції
                data.forEach(function(file) {
                    files.push(dataURItoFile(file, 'generated_image.png'));
                });

                setGeneratedImages(files.slice(0, 4));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const selectImage = async (e) => {
        setFormData({
            ...formData,
            ['image']: generatedImages[e.target.id]
        });

        setChangedData({
            ...changedData,
            ['image']: true
        });
    }

    const hideChoosingImage = () => {
        setGeneratedImages([]);
    }

    const [IdOfAdvert] = useState(window.location.pathname.replace("advertform/edit/", "").replace("/", ""));

    const GetAdvertisementData = () => {
        if (editingMode) {
            fetch(`${serverURL}/advert/get/${IdOfAdvert}`, { 
                method: 'GET',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(data => {
                console.log(data);
                setFormData({
                    ...formData,
                    ['title']: data.title,
                    ['image']: data.image,
                    ['description']: data.description,
                    ['category']: data.category,
                    ['price']: data.price,
                    ['location']: data.location,
                    ['type']: data.type_of_lesson !== "none" ? (data.type_of_lesson ? "Онлайн" : "Офлайн") : "Змішане"
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            setFormData({
                title: '',
                category: '',
                location: '',
                price: '',
                description: '',
                type: 'Тип навчання',
                image: null
            });
        }
    }

    useEffect(GetAdvertisementData, [IdOfAdvert, editingMode]);

    if (isCreated) { 
        return <Navigate replace to="/" />;
    }
    if (isEdited) { 
        return <Navigate replace to="/profile" />;
    }
    return (
        <div className="advert-form-container">
            {generatedImages.length !== 0 && <div className="choosing-image">
                <h2>Виберіть зображення</h2>
                <div className="images">
                    {generatedImages.map(image => (
                        <div className={`image-container ${formData.image === image ? 'selected' : ''}`}>
                            <img id={generatedImages.indexOf(image)} src={CustomCreateURL(image)} onClick={selectImage}/>
                        </div>
                    ))}
                </div>
                <button className="select-image" onClick={hideChoosingImage}>Підтвердити</button>
            </div>}
            <div className="advert-form" onClick={CloseSelect}>
                <h2 className="title advert">{`${editingMode ? "Редагувати" : "Створіть"} оголошення`}</h2>
                <div className="input-field advert-long">
                    <i className="fas fa-heading" />
                    <input type="text" placeholder="Заголовок оголошення" className="title-input" name="title" value={formData.title} onChange={handleDataChange}/>
                    {errors.title && <span className="error-span">{errors.title}</span>}
                </div>
                <div className="input-field image">
                    <div className="drop-file" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                        {formData.image ? <img src={CustomCreateURL(formData.image)} alt="Advert"/> : (isImageGenerating ? <i className="fa-solid fa-spinner fa-spin-pulse" /> : <i className="fa-solid fa-file-arrow-up" />)}
                        <label className="custom-file-upload">
                            Виберіть <span>фото 1×1</span> для оголошення або перетягніть його сюди 
                            <input
                                type="file"
                                accept="image/*"
                                className="image-input"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className="ai-button" onClick={generateImage}><i className="fa-solid fa-robot " /><span>Згенерувати з ШІ</span></div>
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
                    <textarea id="info" name="description" className="description-input" placeholder={isDescrGenerating ? "" : "Розкажіть про себе і свій курс"} value={formData.description}  onChange={handleDataChange}/>
                    <div className="ai-button" onClick={generateText}><i className="fa-solid fa-robot " /><span>Згенерувати з ШІ</span></div>
                    {isDescrGenerating && <i className="fa-solid fa-spinner fa-spin-pulse generating-anim" />}
                    {errors.description && <span className="error-span">{errors.description}</span>}
                </div>
                <button className="input-button" id="advert-create-btn" onClick={handleSubmit}>
                    {`${editingMode ? "Редагувати" : "Створити"} оголошенння`}
                    {errors.request && <span className="error-span">{errors.request}</span>}
                </button>
            </div>
        </div>
    );
}

export default AdvertForm;