import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateForm());
  }, [name, email, password]);

  function validateForm() {
    const isNameValid = name.length >= 2 && name.length <= 40;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 2 && password.length <= 40;

    setNameError(isNameValid ? "" : "Имя должно содержать от 2 до 40 символов");
    setEmailError(isEmailValid ? "" : "Введите корректный email адрес");
    setPasswordError(isPasswordValid ? "" : "Пароль должен содержать от 2 до 40 символов");

    return isNameValid && isEmailValid && isPasswordValid;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

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

    if (isValid) {
      onRegister(name, email, password);
    }
  }

  return (
    <div className='register'>
      <div className="register__container">
        <Link className='register__logo link' to='/'></Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <div className="register__section">
            <h3 className='register__section-title'>Имя</h3>
            <input type="text"
              className='register__section-input'
              placeholder='Введите имя'
              value={name}
              onChange={handleNameChange}
              required />
            <span className='register__section-error'>{nameError}</span>
          </div>
          <div className="register__section">
            <h3 className='register__section-title'>E-mail</h3>
            <input type="email"
              className='register__section-input'
              placeholder='Введите почту'
              value={email}
              onChange={handleEmailChange}
              required />
            <span className='register__section-error'>{emailError}</span>
          </div>
          <div className="register__section">
            <h3 className='register__section-title'>Пароль</h3>
            <input type="password"
              className='register__section-input'
              placeholder='Введите пароль'
              value={password}
              onChange={handlePasswordChange}
              required />
            <span className='register__section-error'>{passwordError}</span>
          </div>
          <button className={`register__submit-button ${!isValid && 'register__submit-button_disabled'}`} disabled={!isValid}>Зарегистрироваться</button>
          <p className='register__login-text'>Уже зарегистрированы?
            <Link to='/signin' className='register__login-link link'>Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
