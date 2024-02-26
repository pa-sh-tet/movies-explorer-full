import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import Navigation from '../Navigation/Navigation';

export default function Header ({ isLoggedIn, openMenu }) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' && 'header__main'}`}>
      <Link to="/" className="header__logo link" />
      {isLoggedIn ? (
        <Navigation openMenu={openMenu} />
      ) : (
        <div className='header__buttons'>
          <Link to='/signup' className="header__auth link">Регистрация</Link>
          <Link to='/signin' className="header__login link">Войти</Link>
        </div>
      )}
    </header>
  )
}