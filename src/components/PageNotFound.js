import { Link } from 'react-router-dom';
import React from 'react';
import '../style/PageNotFound.css';
function PageNotFound(){
  return (
    <div className="page-not-found">
      <div className="message">
        <div> OH NO!</div>
        <div>PAGE NOT FOUND :/ </div>
      </div>
      <Link to="/" className="home-link">
        <div className="sad-frog"></div>
      </Link>

    </div>
  )
}

export default PageNotFound;
