import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export default function Navigation({ openMenu }) {
  const location = useLocation();

  return (
    <nav className="header__navigation">
      <div className="header__links">
        <Link to="/movies" className={`header__movies link ${location.pathname === "/movies" && 'header__link_active'}`}>
          Фильмы
        </Link>
        <Link to="/saved-movies" className={`header__saved-movies link ${location.pathname === "/saved-movies" && 'header__link_active'}`}>
          Сохранённые фильмы
        </Link>
      </div>
      <Link to="/profile" className="header__profile link">
        <div className="header__profile-logo"></div>
        <div className="header__profile-text">
          Аккаунт
        </div>
      </Link>
      <button className='header__menu' onClick={openMenu}></button>
    </nav>
  )
}