// import { Link } from 'react-router-dom';
import React from 'react';

export default function AboutProject () {

  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__description'>
        <div className='about-project__column'>
          <h3 className='about-project__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__timeline'>
        <div className='about-project__backend'>
          <div className='about-project__backend-weeks'>1 неделя</div>
          <p className='about-project__timeline-text'>Back-end</p>
        </div>
        <div className='about-project__frontend'>
          <div className='about-project__frontend-weeks'>4 недели</div>
          <p className='about-project__timeline-text'>Front-end</p>
        </div>
      </div>
    </section>
  )
}