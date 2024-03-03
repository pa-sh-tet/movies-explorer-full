import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../../utils/MainApi';
import { useLocation } from 'react-router-dom';


export default function MoviesCardList({
  isFind,
  onMovieSave,
  onMovieDelete,
  movies,
  savedMovies,
  isLoading,
  setSaveMovies
}) {
  const [moviesToLoad, setMoviesToLoad] = useState(0);
  const [extraMoviesToLoad, setExtraMoviesToLoad] = useState(0);
  const [isActivePreloader, setIsActivePreloader] = useState(false);
  const [moviesToList, setMoviesToList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    mainApi.getSaveMovies()
      .then(res => {
        setSaveMovies(res);
      })
      .catch(error => {
        console.error('Ошибка при загрузке сохраненных фильмов:', error);
      });
  }, [location, setSaveMovies]);
  
  useEffect(() => {
    const lastFoundMovies = JSON.parse(localStorage.getItem('lastFoundMovies'));
    const lastSearchShortFilmChecked = JSON.parse(localStorage.getItem('lastSearchShortFilmChecked'));
    const filteredMovies = lastSearchShortFilmChecked
      ? lastFoundMovies.filter(movie => movie.duration <= 40)
      : lastFoundMovies;
    setMoviesToList(filteredMovies.slice(0, moviesToLoad));
    setIsActivePreloader(filteredMovies.length > moviesToLoad);
  }, [localStorage.getItem('lastFoundMovies'), localStorage.getItem('lastSearchShortFilmChecked'), moviesToLoad]);

  let resizeTimeout = null;
  
  useEffect(() => {
    updateRows();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateRows = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setMoviesToLoad(16);
      setExtraMoviesToLoad(4);
    } else if (screenWidth >= 768) {
      setMoviesToLoad(12);
      setExtraMoviesToLoad(3);
    } else if (screenWidth > 500 && screenWidth < 768) {
      setMoviesToLoad(8);
      setExtraMoviesToLoad(2);
    } else if (screenWidth <= 500) {
      setMoviesToLoad(5);
      setExtraMoviesToLoad(2);
    }
  };

  function handlePreloaderButton() {
    if (moviesToList) {
      updateRows();
      const lastFoundMovies = JSON.parse(localStorage.getItem('lastFoundMovies'));
      setMoviesToList(lastFoundMovies.slice(0, moviesToList.length + extraMoviesToLoad));
      if (moviesToList.length >= lastFoundMovies.length - extraMoviesToLoad) {
        setIsActivePreloader(false)
      }
    } else {
      updateRows();
      setMoviesToList(movies.slice(0, moviesToList.length + extraMoviesToLoad));
      if (moviesToList.length >= movies.length - extraMoviesToLoad) {
        setIsActivePreloader(false)
      }
    }
  }

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateRows, 100);
  };

  return (
    <section className='cardlist'>
      <ul className="cardlist__cards">
        {moviesToList.map((movie) => (
          <MoviesCard
            key={movie.id}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            savedMovies={savedMovies}
            movie={movie}
          />
        ))}
      </ul>
      {isActivePreloader && <button className="cardlist__more-button"
        onClick={handlePreloaderButton}>Ещё</button>}
      <Preloader
        isFind={isFind}
        isLoading={isLoading}
      />
    </section>
  );
}
