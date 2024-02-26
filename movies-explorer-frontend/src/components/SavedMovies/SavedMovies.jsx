import React, { useState, useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Preloader from '../Movies/Preloader/Preloader';

export default function SavedMovies({
  saveMovies,
  onSearchMovies,
  searchMovies,
  setSearchMovies,
  onMovieDelete,
  isLoading,
  isFind,
  isShortSaveMoviesChecked,
  setIsShortSaveMoviesChecked
}) {
  const [moviesToList, setMoviesToList] = useState([]);

  useEffect(() => {
    const filteredMovies = isShortSaveMoviesChecked
      ? saveMovies.filter(movie => movie.duration <= 40)
      : saveMovies;
    setMoviesToList(filteredMovies);
  }, [isShortSaveMoviesChecked, saveMovies]);

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
        {moviesToList.map((movie) => (
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