import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useState, useContext, useEffect } from 'react';

export default function Profile({ signOut, onUpdateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    setIsEditing(true);
    setIsNameValid(value.length >= 2 && value.length <= 40);
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setIsEditing(true);
    setIsEmailValid(value.includes('@') && value.includes('.'));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isNameValid && isEmailValid) {
      onUpdateUser({
        name: name,
        email: email,
      });
      setIsEditing(false);
    }
  }

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form className='profile__labels'>
        <div className='profile__label'>
          <p className='profile__label-title'>Имя</p>
          <input
            type="text"
            value={name || ''}
            onChange={handleNameChange}
            className={`profile__label-text ${!isNameValid ? 'profile__label-text_invalid' : ''}`}
            minLength="2"
            maxLength="40"
            disabled={!isEditing}
            required
          />
          {!isNameValid && <span className='profile__section-error'>Имя должно содержать от 2 до 40 символов</span>}
        </div>
        <div className='profile__label'>
          <p className='profile__label-title'>E-mail</p>
          <input
            type="email"
            value={email || ''}
            minLength="2"
            maxLength="40"
            onChange={handleEmailChange}
            className={`profile__label-text ${!isEmailValid ? 'profile__label-text_invalid' : ''}`}
            disabled={!isEditing}
            required
          />
          {!isEmailValid && <span className='profile__section-error'>Введите корректный email адрес</span>}
        </div>
      </form>
      {isEditing ? (
        <button onClick={handleSubmit} className='profile__edit-button link'>Сохранить</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className='profile__edit-button link' disabled={isEditing}>Редактировать</button>
      )}
      <Link to="/" className='profile__exit-button link' onClick={signOut}>Выйти из аккаунта</Link>
    </div>
  );
}
