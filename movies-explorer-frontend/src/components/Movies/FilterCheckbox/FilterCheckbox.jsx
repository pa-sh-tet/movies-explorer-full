import React from 'react';

export default function FilterCheckbox({ isShortFilmChecked, setIsShortFilmChecked }) {
  function handleShortFilmsCheck() {
    if (isShortFilmChecked) {
      setIsShortFilmChecked(false);
      localStorage.setItem("lastSearchShortFilmChecked", JSON.stringify(false));
    } else {
      setIsShortFilmChecked(true);
      localStorage.setItem("lastSearchShortFilmChecked", JSON.stringify(true));
    }
  }

  return (
    <div className='filter'>
      <input type="checkbox"
        className='filter__button' 
        id="switch"
        checked={isShortFilmChecked}
        onChange={handleShortFilmsCheck}
      />
      <p className='filter__text'>Короткометражки</p>
    </div>
  );
}