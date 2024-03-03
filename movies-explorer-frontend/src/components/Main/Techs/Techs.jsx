import React from 'react';

export default function Techs () {

  return (
    <section className='techs' id="techs">
      <h3 className='techs__title'>Технологии</h3>
      <h2 className='techs__count'>7 технологий</h2>
      <p className='techs__description'>
        На курсе веб-разработки мы освоили 
        технологии, которые применили в дипломном проекте.
      </p>
      <div className='techs__items'>
        <div className='techs__item'>HTML</div>
        <div className='techs__item'>CSS</div>
        <div className='techs__item'>JS</div>
        <div className='techs__item'>React</div>
        <div className='techs__item'>Git</div>
        <div className='techs__item'>Express.js</div>
        <div className='techs__item'>mongoDB</div>
      </div>
    </section>
  )
}