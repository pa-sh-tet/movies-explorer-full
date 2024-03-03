import { Link } from 'react-router-dom';
import React from 'react';

export default function Footer() {
  return (
    <footer className='footer'>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__main">
        <h3 className="footer__date">© 2024</h3>
        <div className='footer__links'>
          <Link className='footer__link-yandex link' target='_blank' to='https://practicum.yandex.ru/'>Яндекс.Практикум</Link>
          <Link className='footer__link-github link' target='_blank' to='https://github.com/pa-sh-tet'>Github</Link>          
        </div>
      </div>
    </footer>
  );
}