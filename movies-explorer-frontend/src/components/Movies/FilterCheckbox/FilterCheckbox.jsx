import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FilterCheckbox({ isShortFilmChecked, setIsShortFilmChecked }) {
  const location = useLocation();

  function handleShortFilmsCheck() {
    if (isShortFilmChecked) {
      setIsShortFilmChecked(false);
      localStorage.setItem("lastSearchShortFilmChecked", JSON.stringify(false));
    } else {
      setIsShortFilmChecked(true);
      localStorage.setItem("lastSearchShortFilmChecked", JSON.stringify(true));
    }
  }

  function handleShortSaveFilmsCheck() {
    if (isShortFilmChecked) {
      setIsShortFilmChecked(false);
    } else {
      setIsShortFilmChecked(true);
    }
  }

  return (
    <div className='filter'>
      <input type="checkbox"
        className='filter__button' 
        id="switch"
        checked={isShortFilmChecked}
        onChange={location.pathname === '/movies'
        ? handleShortFilmsCheck
        : handleShortSaveFilmsCheck}
      />
      <p className='filter__text'>Короткометражки</p>
    </div>
  );
}