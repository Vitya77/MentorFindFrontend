import React from 'react';

function Main() {
    /* A component of main page. It containes footer with search and the content of the main page */

    return (
    <div>
    <header className="site-header">
        <h1 className="main-title">INTRODUCING COMPANY</h1>
        <div className="search-container">
          <form action="/search" method="get">
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Знайти репетитора..."
                name="search"
              />
              <button className="search-button" type="submit">
                Пошук
              </button>
            </div>
          </form>
        </div>
    </header>
    <div className="loding">
        <i className="fa fa-refresh fa-spin fa-3x fa-fw " />
        <span className="sr-only">Loading...</span>
    </div>
    </div>
    );
}
    
export default Main;