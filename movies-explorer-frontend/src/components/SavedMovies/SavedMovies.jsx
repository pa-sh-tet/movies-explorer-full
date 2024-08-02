import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Preloader from '../Movies/Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';

export default function SavedMovies({
  saveMovies,
  setSaveMovies,
  onSearchMovies,
  searchMovies,
  setSearchMovies,
  onMovieDelete,
  isLoading,
  isFind,
  setIsFind,
  isShortSaveMoviesChecked,
  setIsShortSaveMoviesChecked
}) {
  const location = useLocation();

  useEffect(() => {
    const filteredMovies = isShortSaveMoviesChecked
      ? saveMovies.filter(movie => movie.duration <= 40)
      : saveMovies;
    setSaveMovies(filteredMovies);
  }, [saveMovies, isShortSaveMoviesChecked, setSaveMovies]);

  useEffect(() => {
    mainApi.getSaveMovies()
      .then(res => {
        setSaveMovies(res);
        setIsFind(true);
      })
      .catch(error => {
        console.error('Ошибка при загрузке сохраненных фильмов:', error);
      });
  }, [location, isShortSaveMoviesChecked, setSaveMovies]);

  useEffect(() => {
    setIsShortSaveMoviesChecked(false);
    setSearchMovies('');
  }, [location, setSearchMovies, setIsShortSaveMoviesChecked]);

  return (
    <div className='saved-movies'>
      <SearchForm 
        onSearchMovies={onSearchMovies}
        searchMovies={searchMovies}
        setSearchMovies={setSearchMovies}
        isShortFilmChecked={isShortSaveMoviesChecked}
        setIsShortFilmChecked={setIsShortSaveMoviesChecked}
      />
      <ul className="saved-movies__container">
        {saveMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            onMovieDelete={onMovieDelete}
            movie={movie}
          />
        ))}
      </ul>
      <Preloader isFind={isFind} isLoading={isLoading} />
    </div>
  );
}
