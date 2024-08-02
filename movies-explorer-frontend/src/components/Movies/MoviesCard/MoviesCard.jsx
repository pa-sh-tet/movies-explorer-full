import React, { useState, useEffect } from 'react';
import { movies_api_url } from '../../../utils/utils.js';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({
  onMovieSave,
  onMovieDelete,
  savedMovies,
  movie
}) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsActive(savedMovies.some(element => movie.id === element.movieId));
    }
  }, [savedMovies, movie.id, location]);

  const handleButtonClick = () => {
    if (!isActive) {
      Promise.resolve(onMovieSave(movie))
        .catch(error => {
          console.error('Произошла ошибка при сохранении фильма:', error);
          setIsActive(false);
        });
    } else {
      Promise.resolve(onMovieDelete(savedMovies.find(m => m.movieId === movie.id)))
        .catch(error => {
          console.error('Произошла ошибка при удалении фильма:', error);
          setIsActive(true);
        });
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
          <button
            className={`card__save-button link ${isActive ? 'card__save-button_active' : ''}`}
            onClick={handleButtonClick}
          ></button>
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
