import React, { useState, useEffect } from 'react';
import config from '../config';
import MiniAdvert from './MiniAdvert';
import { useLocation } from 'react-router-dom';

const serverURL = config.serverURL;

function Search() {
    /* A component of search page */
    const urlParams = new URLSearchParams(window.location.search);
    const [searchText, setSearchText] = useState(urlParams.get('q'));

    const handleChange = (event) => {
      const { value } = event.target;
      setSearchText(value);
    }

    const [data, setData] = useState([]);

    const handleSearch = () => {
      fetch(`${serverURL}/advert/adding-and-searching/?t=${searchText}&c=${searchText}&l=${searchText}&d=${searchText}`, { //Sending a request
        method: 'GET',
        headers: 
            localStorage.getItem('mentorFindToken') !== null ? {'Authorization': `Token ${localStorage.getItem('mentorFindToken')}`} : {}
        
      })
      .then(response => {
          return response.json();
      })
      .then(data => { 
          setData(data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }

    const location = useLocation();

    useEffect(() => {
      // Ваша функція, яку потрібно викликати
      handleSearch();
    }, [location]);

    return (
    <>
    <header className="search-header">
        <div className="search-container search-page">
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Знайти репетитора..."
                name="search"
                value={searchText}
                onChange={handleChange}
              />
              <button className="search-button" onClick={handleSearch}>
                Пошук
              </button>
            </div>
        </div>
    </header>
    <div className="search-content">
        {/* Картінка, ім'я автора, ціна, локація, тип уроку, рейтинг */}
        {data.map(dictionary => (
          <MiniAdvert advert_id={dictionary.id} image={dictionary.image} title={dictionary.title} rating={dictionary.average_rating ? dictionary.average_rating : 0} price={dictionary.price} location={dictionary.location} type={dictionary.type_of_lesson} description={dictionary.description} category={dictionary.category} showHeart={localStorage.getItem('mentorFindToken') !== null ? true : false} isSelected={dictionary.is_saved}/>
        ))}
    </div>
    </>
    );
}
    
export default Search;