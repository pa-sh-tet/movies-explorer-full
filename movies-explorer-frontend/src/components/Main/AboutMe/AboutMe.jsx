import { Link } from 'react-router-dom';
import React from 'react';

export default function AboutMe () {

  return (
    <section className='about-me' id="about-me">
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__main'>
        <div className='about-me__description'>
          <h2 className='about-me__description-title'>Виталий</h2>
          <h3 className='about-me__description-mark'>
            Фронтенд-разработчик, 30 лет
          </h3>
          <p className='about-me__description-text'>
            Я родился и живу в Саратове, 
            закончил факультет экономики СГУ. У меня есть жена и дочь. Я 
            люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал 
            кодить. С 2015 года работал в компании «СКБ Контур». После того, 
            как прошёл курс по веб-разработке, начал заниматься 
            фриланс-заказами и ушёл с постоянной работы.
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