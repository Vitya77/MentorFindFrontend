import React, { useState, useEffect, useRef } from 'react';
import config from '../config';
import Review from './Review';
import NotFound from './NotFoundPage';
import * as Yup from 'yup';
import AdvertSelect from './AdvertSelect';
import { Link } from 'react-router-dom';

const serverURL = config.serverURL;

const validationSchema = Yup.object().shape({ // Validation schema of all inputs
    rating: Yup.number()
        .min(1, '*  Оцінка не може бути нульвовою'),
    text: Yup.string()
        .required('*  Заповніть це поле'),
});

function AdvertPage({AuthClick, OnSignUp}) {

    const [notFound, setNotFound] = useState(false);

    const [URlparam] = useState(window.location.pathname.replace("/advert/", ""));

    const [advertData, setAdvertData] = useState({
        author: 0,
        average_rating: null,
        category: "",
        description: "",
        image: "",
        location: "",
        price: "",
        title: "",
        type_of_lesson: "",
        is_saved: null
    });

    const [authorData, setAuthorData] = useState({
        id: 0,
        email: "",
        username: "",
        photo: null
    });

    const getAdvertData = () => {
        fetch(`${serverURL}/advert/get/${URlparam}`, { //Sending a request
            method: 'GET',
            headers: 
                localStorage.getItem('mentorFindToken') !== null ? {'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`} : {}
        })
          .then(response => {
            if (response.status === 404) {
                setNotFound(true);
                return;
            }
            return response.json();
          })
          .then(data => {
            setAdvertData(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    
    useEffect(getAdvertData, [URlparam]);

    useEffect(() => {
        fetch(`${serverURL}/users/get/${advertData.author}`, { //Sending a request
            method: 'GET',
            headers: 
                localStorage.getItem('mentorFindToken') !== null ? {'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`} : {}
        })
            .then(response => {
                if (response.status === 404) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data.id && data.email && data.username) {
                    setAuthorData(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [advertData.author]);

    const [reviewsData, setReviewsData] = useState([]);

    const getReviews = () => {
        fetch(`${serverURL}/advert/review-by-advertisement/${URlparam}`, { //Sending a request
            method: 'GET',
            headers: 
                localStorage.getItem('mentorFindToken') !== null ? {'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`} : {}
        })
            .then(response => {
                if (response.status === 404) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                setReviewsData(data.reverse());
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(getReviews, [URlparam]);

    const viewAdvert = () => {
        if (localStorage.getItem('mentorFindToken') !== null) {
        fetch(`${serverURL}/viewhistory/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            },
            body: JSON.stringify({
                'advertisement': URlparam
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }

    useEffect(viewAdvert, [URlparam]);

    const [reviewData, setReviewData] = useState({
        rating: 0,
        text: "",
        advertisement: URlparam
    });

    const [errors, setErrors] = useState({});

    const validateField = async (name, value) => { // Function to validate field
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({ ...errors, [name]: '' });
        } catch (error) {
            setErrors({ ...errors, [name]: error.message });
        }
    };

    const handleStarClick = (starValue) => {
        setReviewData({
            ...reviewData,
            ['rating']: starValue
        });

        validateField('rating', starValue);
    };

    const handleTextChange = (e) => {
        setReviewData({
            ...reviewData,
            ['text']: e.target.value
        });

        validateField('text', e.target.value);
    }

    const [animation, setAnimation] = useState(false);

    const sendReview = async (e) => {
        e.preventDefault();
        
        setAnimation(false);

        try {
            await validationSchema.validate(reviewData, { abortEarly: false });

            fetch(`${serverURL}/advert/review/`, { //Sending a request
                method: 'POST',
                body: JSON.stringify(reviewData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
                }
            })
            .then(response => {
                if (response.status === 201) {
                    getAdvertData();
                    getReviews();
                    setReviewData({
                        rating: 0,
                        text: "",
                        advertisement: URlparam
                    });
                    setAnimation(true);
                }
                return response.json();
            })
            .then(data => {
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        } catch (error) { // If validation is not correct change errors text
                const fieldErrors = {};
                error.inner.forEach(err => {
                    fieldErrors[err.path] = err.message;
                });
                setErrors(fieldErrors);
            }
    }

    const [numberOfReviewsToShow, setNumberOfReviewsToShow] = useState(4);
    const reviewsContainerRef = useRef(null);

    const showMoreReviews = () => {
      setNumberOfReviewsToShow(prev => prev + 4); // Показати на 4 відгуків більше
    };

    const showLessReviews = () => {
        setNumberOfReviewsToShow(4);
        if (reviewsContainerRef.current) {
            reviewsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      const [myData, setMyData] = useState({});
    
    const GetMyData = () => {
        fetch(`${serverURL}/users/getViaToken/`, { //Sending a request
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            }
        })
            .then(response => {
                if (response.status === 404) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data.id && data.email && data.username) {
                    setMyData(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(GetMyData, []);

    const SignUpForAdvert = (e) => {
        e.preventDefault();

        const textToSend = `Я хочу записатися до вас на оголошення ${advertData.title}! \nБудь ласка зв'яжіться зі мною через емейл: `
        const dataToSend = JSON.stringify({
            "receiver": parseInt(authorData.id),
            "advert": URlparam,
            "text": textToSend
        })

        fetch(`${serverURL}/appointment/`, { //Sending a request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`
            },
            body: dataToSend
        })
        .then(response => {
            if (response.status === 201) {
                OnSignUp("Ваш запит надіслано, очікуйте відповіді від викладача");
            }
            return response.json();
        })
        .then(data => {
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    return notFound ? <NotFound /> : (
        <div className="advert-page">
            <div className="advert-left-side-container">
                <div className="advert-left-side">
                    <div className="advert-image">
                        <img src={authorData.photo} alt="Author"/>
                    </div>
                    <a href="#advert-information" className="advert-link">Загальна інформація</a>
                    <a href="#advert-about" className="advert-link">Про себе</a>
                    <a href="#advert-reviews" className="advert-link">Відгуки</a>
                    {localStorage.getItem('mentorFindToken') !== null && myData.id !== authorData.id && <button className="sign-up-for-advert" onClick={SignUpForAdvert}>Записатись</button>}
                </div>
            </div>
            <div className="advert-right-side">
                <div className="advert-userinfo">
                    <div className="advert-username">
                        {authorData.username}
                    </div>
                    {/* <div className="advert-email">
                        {authorData.email}
                    </div> */}
                </div>
                <div id="advert-information" className={`advert-information ${localStorage.getItem('mentorFindToken') === null && "not-authenticated"}`}>
                    <div className="advert-information-child advert-title">
                        {advertData.title}
                    </div>
                    <div>
                        <div className="advert-information-child star" style={{'--rating': `${advertData.average_rating/5 * 100}%`}}>★★★★★</div>
                    </div>
                    {advertData.is_saved !== null && localStorage.getItem('mentorFindToken') !== null && <AdvertSelect advert_id={URlparam} is_selected={advertData.is_saved}/>}
                    <div className="advert-information-child advert-category">
                        {advertData.category}
                    </div>
                    <div className="advert-information-child advert-category">
                        {advertData.type_of_lesson}
                    </div>
                    <div className="advert-information-child advert-category">
                        {advertData.location}
                    </div>
                    <div className="advert-information-child advert-category">
                        ${advertData.price}
                    </div>
                </div>
                <div id="advert-about" className="advert-about">
                    <h2>Про себе</h2>
                    <div className="advert-description">
                        {advertData.description}
                        <img src={advertData.image}/>
                    </div>
                </div>
                <div id="advert-reviews" className="advert-reviews" ref={reviewsContainerRef}>
                    <h2>Відгуки</h2>
                    <div className="reviews-container">
                        {reviewsData.slice(0, numberOfReviewsToShow).map((review, index) => (
                            <Review animation={index === 0 ? animation : false} author_username={review.author_name} rating={review.rating} text={review.text}/>
                        ))}
                    </div>
                    {reviewsData.length === 0 && 
                        <div style={{
                            color: '#444',
                            fontWeight: 500,
                            fontSize: '20px',
                            alignSelf: 'center',
                            margin: '5px 0'
                        }}>
                            Поки що відгуків немає
                        </div>
                    }
                    {numberOfReviewsToShow > 4 && (
                        <button className="reviews-load" onClick={showLessReviews}>Сховати...</button>
                    )}
                    {numberOfReviewsToShow < reviewsData.length && (
                        <button className="reviews-load" onClick={showMoreReviews}>Показати більше...</button>
                    )}
                    {localStorage.getItem('mentorFindToken') !== null ? <div className="review-form">
                        <h4>Оцініть курс</h4>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= reviewData.rating ? 'star-filled' : 'star-empty'}
                                    onClick={() => handleStarClick(star)}
                                    value={star}
                                    name="rating"
                                >
                                    ★
                                </span>
                            ))}
                            {errors.rating && <span className="error-span" style={{marginLeft: "10px"}}>{errors.rating}</span>}
                        </div>
                        <input type="text" placeholder="Написати відгук.." value={reviewData.text} name="text" onChange={handleTextChange}/>
                        <span className="highlight"></span>
                        <span className="bar">{errors.text && <span className="error-span">{errors.text}</span>}</span>
                        <div className="send-review-button-container" onClick={sendReview}>
                            <i className="fa-solid fa-paper-plane send-review-button"/>
                        </div>
                    </div> : <Link to="/auth" className="not-authenticated-review " onClick={AuthClick}>
                            Щоб залишити відгук <span>увійдіть</span> в акаунт <i className="fa-solid fa-arrow-right"/>
                        </Link>}
                </div>
            </div>
        </div>
    );
}
    
export default AdvertPage;