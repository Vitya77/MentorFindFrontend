import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {
    /* A component of main page. It contains footer with search and the content of the main page */

    const [search, setSearch] = useState("");

    function handleSearchChange(e) {
      const { value } = e.target;
      setSearch(value);
    }

    return (
    <div>
    <header className="site-header">
        <h1 className="main-title">MentorFind</h1>
        <p>Допоможемо знайти кращого репетитора серед наших спеціалістів</p>
        <div className="search-container">
          <form>
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Знайти репетитора..."
                name="search"
                onChange={handleSearchChange}
              />
              <Link to={"/search/?q=" + search} className="search-button">
                Пошук
              </Link>
            </div>
          </form>
        </div>
    </header>

    <main className="main-content">
      <h2 className="benefits-title">Що ти отримаєш?</h2>
      <div className="benefits">
        <div className="benefit students-benefits">
          <h3>Як студент:</h3>
          <ul>
            <li>- Знаходження репетиторів у вашому регіоні</li>
            <li>- Великий вибір предметів для навчання</li>
            <li>- Система рейтингів та відгуків на репетиторів</li>
            <li>- Гнучкий графік навчання</li>
            <li>- Доступні онлайн та офлайн курси</li>
          </ul>
        </div>
        <div className="benefit tutors-benefits">
          <h3>Як репетитор:</h3>
          <ul>
            <li>- Поширення вашого курсу серед широкого кола студентів</li>
            <li>- Створення власного профілю та оголошень про курси</li>
            <li>- Отримання зворотного зв'язку від студентів</li>
            <li>- Розкрутка вашого ім'я як професійного репетитора</li>
            <li>- Можливість пропонувати онлайн та офлайн заняття</li>
          </ul>
        </div>
      </div>
      <div className="top-tutors"></div>
      <div className="top-feedback"></div>
    </main>

    <div className="loding">
        <i className="fa fa-refresh fa-spin fa-3x fa-fw " />
        <span className="sr-only">Loading...</span>
    </div>
    </div>
    );
}
    
export default Main;