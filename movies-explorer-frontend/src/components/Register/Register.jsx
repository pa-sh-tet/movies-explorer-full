import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(name, email, password);
  }

  return (
    <div className='register'>
      <div className="register__container">
        <Link className='register__logo link' to='/'></Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <div className="register__section">
            <h3 className='register__section-title'>Имя</h3>
            <input 
              type="text"
              className='register__section-input'
              placeholder='Введите имя'
              minLength="2"
              maxLength="40"
              value={name}
              onChange={handleNameChange}
              required
            />
            <span className='register__section-error'>Что-то пошло не так...</span>
          </div>
          <div className="register__section">
            <h3 className='register__section-title'>E-mail</h3>
            <input
              type="email"
              className='register__section-input'
              placeholder='Введите почту'
              minLength="2"
              maxLength="40"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className='register__section-error'>Что-то пошло не так...</span>
          </div>
          <div className="register__section">
            <h3 className='register__section-title'>Пароль</h3>
            <input
              type="password"
              className='register__section-input'
              placeholder='Введите пароль'
              minLength="2"
              maxLength="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className='register__section-error'>Что-то пошло не так...</span>
          </div>
          <button className='register__submit-button'>Зарегистрироваться</button>
          <p className='register__login-text'>Уже зарегистрированы?
            <Link to='/signin' className='register__login-link link'>Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
}