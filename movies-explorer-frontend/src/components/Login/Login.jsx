import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password)
  }

  return (
    <div className='login'>
      <div className="login__container">
        <Link className='login__logo link' to='/'></Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className="login__section">
            <h3 className='login__section-title'>E-mail</h3>
            <input
              type="email"
              id='email'
              className='login__section-input'
              placeholder='Введите почту'
              minLength="2"
              maxLength="40"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className='login__section-error'>Что-то пошло не так...</span>
          </div>
          <div className="login__section">
            <h3 className='login__section-title'>Пароль</h3>
            <input
              type="password"
              id='password'
              className='login__section-input'
              placeholder='Введите пароль'
              minLength="2"
              maxLength="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className='login__section-error'>Что-то пошло не так...</span>
          </div>
          <button className='login__submit-button'>Войти</button>
          <p className='login__register-text'>Ещё не зарегистрированы?<Link to='/signup' className='login__register-link link'>Регистрация</Link></p>
        </form>
      </div>
    </div>
  );
}