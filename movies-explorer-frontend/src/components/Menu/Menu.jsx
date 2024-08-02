import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Menu ({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <div className={isOpen ? `menu menu_active` : `menu`}>
      <div className="menu__container">
        <div className="menu__links">
          <Link className={`menu__link link ${location.pathname === '/' && 'menu__link_active'}`} to='/'>Главная</Link>
          <Link className={`menu__link link ${location.pathname === '/movies' && 'menu__link_active'}`} to='/movies'>Фильмы</Link>
          <Link className={`menu__link link ${location.pathname === '/saved-movies' && 'menu__link_active'}`} to='/saved-movies'>Сохранённые фильмы</Link>
        </div>
        <Link className='menu__account link' to='/profile'></Link>
        <button className='menu__close-button' onClick={onClose}></button>
      </div>
    </div>
  )
}