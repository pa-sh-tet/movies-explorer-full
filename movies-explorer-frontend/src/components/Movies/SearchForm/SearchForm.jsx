import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from 'react';

export default function SearchForm({
  onSearchMovies,
  searchMovies,
  setSearchMovies,
  setIsShortFilmChecked,
  isShortFilmChecked
}) {
  const handleChange = (e) => {
    setSearchMovies(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(e);
  }

  return (
    <div className='search'>
      <form className='search__container' onSubmit={handleSubmit}>
        <div className='search__logo'/>
        <input type="text"
          className='search__input'
          placeholder='Фильм'
          value={searchMovies}
          onChange={handleChange}
          required />
        <button className='search__button'>
          <div className='search__button-image'/>
        </button>
        <FilterCheckbox
          setIsShortFilmChecked={setIsShortFilmChecked}
          isShortFilmChecked={isShortFilmChecked}
        />
      </form>
    </div>
  );
}