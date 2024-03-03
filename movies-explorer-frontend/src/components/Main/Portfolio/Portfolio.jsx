import { Link } from 'react-router-dom';
import React from 'react';

export default function Portfolio () {

  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <Link className='portfolio__item link' target='_blank' to="https://pa-sh-tet.github.io/how-to-learn/">
        <h2 className='portfolio__item-title'>Статичный сайт</h2>
        <div className='portfolio__item-arrow'>↗</div>
      </Link>
      <Link className='portfolio__item link' target='_blank' to="https://pa-sh-tet.github.io/russian-travel/">
        <h2 className='portfolio__item-title'>Адаптивный сайт</h2>
        <div className='portfolio__item-arrow'>↗</div>
      </Link>
      <Link className='portfolio__item link' target='_blank' to="https://mesto-altapov.nomoredomainsmonster.ru">
        <h2 className='portfolio__item-title'>Одностраничное приложение</h2>
        <div className='portfolio__item-arrow'>↗</div>
      </Link>
    </section>
  )
}