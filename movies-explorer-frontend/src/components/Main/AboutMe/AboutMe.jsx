import { Link } from 'react-router-dom';
import React from 'react';

export default function AboutMe () {

  return (
    <section className='about-me' id="about-me">
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__main'>
        <div className='about-me__description'>
          <h2 className='about-me__description-title'>Павел</h2>
          <h3 className='about-me__description-mark'>
            Фронтенд-разработчик, 19 лет
          </h3>
          <p className='about-me__description-text'>
            Я родился в Тольятти, в 18 лет поступил в Казань и теперь живу здесь.
            Учусь по программе "Математическое обеспечение и администрирование информационных систем".
            13 лет занимаюсь баскетболом, играю за сборную команду университета.
            Обладаю хорошим знанием английского на уровне B2.
          </p>
          <Link className='about-me__link link' target='_blank' to='https://github.com/pa-sh-tet'>
            Github
          </Link>
        </div>
        <div className='about-me__photo'></div>
      </div>
    </section>
  )
}