import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import InfoToolTip from '../InfoTooltip/InfoTooltip';
import { auth } from '../../utils/Auth.js';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchMovies, setSearchMovies] = useState('');
  const [searchSaveMovies, setSearchSaveMovies] = useState('');
  const [movies, setMovies] = useState([]);
  const [isFind, setIsFind] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [isShortSaveMoviesChecked, setIsShortSaveMoviesChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(() => {
          setIsLoggedIn(true);
          navigate("/", {replace: true}); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([ mainApi.getUserInfo(), mainApi.getSaveMovies() ])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSaveMovies(movies);
        })
        .catch((error) => {
          console.log(error);
        })
      }
  }, [isLoggedIn]);

  const handleSearchMovies = (e) => {
    e.preventDefault();
    setIsLoading(true);
    moviesApi.getMovies()
      .then(res => {
        const filteredMovies = res.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchMovies.toLowerCase())
        );
        setMovies(filteredMovies);
        setIsFind(filteredMovies.length > 0);
        localStorage.setItem('lastSearch', searchMovies);
        localStorage.setItem('lastFoundMovies', JSON.stringify(filteredMovies));
      })
      .catch(error => {
        setIsFind(false);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const handleSearchSaveMovies = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mainApi.getSaveMovies()
      .then(res => {
        const filteredMovies = res.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchSaveMovies.toLowerCase())
        );
        setSaveMovies(filteredMovies);
        setIsFind(filteredMovies.length > 0);
      })
      .catch(error => {
        setIsFind(false);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoPopupOpen(true);
          handleLogin(email, password)
        } else {
          setIsSuccess(false);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true); 
      })
      .then(() => {
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.setItem('lastFoundMovies', JSON.stringify([]));
    localStorage.setItem('lastSearchShortFilmChecked', false);
    localStorage.setItem('lastSearch', '');
    setIsLoggedIn(false);
  }

  const handleUpdateUser = (newUserInfo) => {
    mainApi.patchUserInfo(newUserInfo)
      .then((newData) => {
        setCurrentUser(newData);
        setIsSuccess(true);
        setIsInfoPopupOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
      });
  }

  const handleMovieSave = (movie) => {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSaveMovies([newMovie, ...saveMovies]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleMovieDelete = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSaveMovies((movies) => movies.filter(item => item._id !== movie._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  }

  const closeInfoPopup = () => {
    setIsInfoPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className='app'>
          <Routes>
            <Route path="/signup"
              element={isLoggedIn
              ? <Navigate to="/" replace />
              : <Register
                onRegister={handleRegister}
              />}>
            </Route>
            <Route path="/signin"
              element={isLoggedIn
              ? <Navigate to="/" replace />
              : <Login
                onLogin={handleLogin}
              />}>
            </Route>
            <Route path="/" element={
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    openMenu={setIsMenuOpen} />
                  <Main />
                  <Footer />
                </>
              }>
            </Route>
            <Route path="/movies" element={
              <>
                <ProtectedRouteElement 
                  element={Header}
                  isLoggedIn={isLoggedIn}
                  openMenu={setIsMenuOpen}
                />
                <ProtectedRouteElement 
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  isFind={isFind}
                  onMovieSave={handleMovieSave}
                  onMovieDelete={handleMovieDelete}
                  onSearchMovies={handleSearchMovies}
                  searchMovies={searchMovies}
                  setSearchMovies={setSearchMovies}
                  movies={movies}
                  isLoading={isLoading}
                  savedMovies={saveMovies}
                  setIsShortFilmChecked={setIsShortFilmChecked}
                  isShortFilmChecked={isShortFilmChecked}
                  setSaveMovies={setSaveMovies}
                />
                <ProtectedRouteElement 
                  element={Footer}
                  isLoggedIn={isLoggedIn}
                />
              </>}>
            </Route>
            <Route path="/saved-movies" element={
              <>
                <ProtectedRouteElement
                  element={Header}
                  isLoggedIn={isLoggedIn}
                  openMenu={setIsMenuOpen}
                />
                <ProtectedRouteElement
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  saveMovies={saveMovies}
                  setSaveMovies={setSaveMovies}
                  onSearchMovies={handleSearchSaveMovies}
                  searchMovies={searchSaveMovies}
                  setSearchMovies={setSearchSaveMovies}
                  onMovieDelete={handleMovieDelete}
                  isFind={isFind}
                  setIsFind={setIsFind}
                  isLoading={isLoading}
                  isShortSaveMoviesChecked={isShortSaveMoviesChecked}
                  setIsShortSaveMoviesChecked={setIsShortSaveMoviesChecked}
                />
                <ProtectedRouteElement
                  element={Footer}
                  isLoggedIn={isLoggedIn}
                />
              </>}>
            </Route>
            <Route path="/profile" element={
              <>
                <ProtectedRouteElement 
                  element={Header}
                  isLoggedIn={isLoggedIn}
                  openMenu={setIsMenuOpen}
                />
                <ProtectedRouteElement
                  element={Profile}
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  signOut={signOut}
                  onUpdateUser={handleUpdateUser}
                />
              </>}>
            </Route>
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />} />
          </Routes>
          <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
          <InfoToolTip 
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
          isSuccess={isSuccess} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;