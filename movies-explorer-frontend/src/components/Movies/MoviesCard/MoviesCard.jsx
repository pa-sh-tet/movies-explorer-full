import {useLocation} from 'react-router-dom';
import { movies_api_url } from '../../../utils/utils.js';
import React, { useState, useEffect } from 'react';

export default function MoviesCard({
  onMovieSave,
  onMovieDelete,
  savedMovies,
  movie
}) {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsChecked(savedMovies.some(element => movie.id === element.movieId));      
    }
  }, [savedMovies]);

  function handleCheckboxChange () {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onMovieSave(movie);
    } else {
      onMovieDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    }
  };

  function formatDuration(duration) {
    if (duration < 60) {
      return `${duration}мин`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      if (minutes === 0) {
        return `${hours}ч`;
      } else {
        return `${hours}ч${minutes}мин`;
      }
    }
  }

  return (
    <li className='card'>
      {location.pathname === '/movies'
        ? (<div className='card__image'
            style={{backgroundImage: `url("${movies_api_url.url}${movie.image.url}")`}}
          />)
        : (<div className='card__image'
        style={{backgroundImage: `url("${movie.image}")`}}
      />)
      }
      <div className="card__container">
        <h3 className='card__name'>
          {movie.nameRU}
        </h3>
        {location.pathname === '/movies' ? (
          <input
            type="checkbox"
            className='card__save-button link' 
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        ) : (
          <button onClick={() => onMovieDelete(movie)} className='card__delete-button link'></button>
        )}
      </div>
      <p className='card__time'>
        {formatDuration(movie.duration)}
      </p>
    </li>
  );
}