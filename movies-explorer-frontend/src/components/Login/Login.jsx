import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateForm());
  }, [email, password]);

  function validateForm() {
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 2 && password.length <= 40;

    setEmailError(isEmailValid ? "" : "Введите корректный email адрес");
    setPasswordError(isPasswordValid ? "" : "Пароль должен содержать от 2 до 40 символов");

    return isEmailValid && isPasswordValid;
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(email, password);
    }
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
            <span className='login__section-error'>{emailError}</span>
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
            <span className='login__section-error'>{passwordError}</span>
          </div>
          <button className={`login__submit-button ${!isValid && 'login__submit-button_disabled'}`} disabled={!isValid}>Войти</button>
          <p className='login__register-text'>Ещё не зарегистрированы?<Link to='/signup' className='login__register-link link'>Регистрация</Link></p>
        </form>
      </div>
    </div>
  );
}
