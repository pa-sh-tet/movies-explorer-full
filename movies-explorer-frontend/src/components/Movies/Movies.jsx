import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import React, { useEffect } from 'react';

export default function Movies({
  isFind,
  onMovieSave,
  movies,
  onMovieDelete,
  onSearchMovies,
  isLoading,
  savedMovies,
  setSearchMovies,
  searchMovies,
  setIsShortFilmChecked,
  isShortFilmChecked,
  setSaveMovies
}) {
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      setSearchMovies(lastSearch);
    };
    const lastSearchShortFilmChecked = JSON.parse(localStorage.getItem('lastSearchShortFilmChecked'));
    setIsShortFilmChecked(lastSearchShortFilmChecked || false);
  }, [setIsShortFilmChecked]);

  return (
    <div className='movies'>
      <SearchForm
        onSearchMovies={onSearchMovies}
        searchMovies={searchMovies}
        setSearchMovies={setSearchMovies}
        setIsShortFilmChecked={setIsShortFilmChecked}
        isShortFilmChecked={isShortFilmChecked}
      />
      <MoviesCardList
        isFind={isFind}
        savedMovies={savedMovies}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
        movies={movies}
        isLoading={isLoading}
        setSaveMovies={setSaveMovies}
      />
    </div>
  );
}
