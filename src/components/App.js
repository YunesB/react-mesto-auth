/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Authorization from './Authorization.jsx';
import Footer from './Footer.jsx';

import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth.jsx';

import ConfirmationPopup from './ConfirmationPopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ImagePopup from './ImagePopup';
import PageIsLoading from './PageIsLoading';

import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { api } from '../utils/api.js';

function App() {

  const [isPageLoading, setIsPageLoading] = React.useState(true);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCardOpen] = React.useState();
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  let [currentCard, setCurrentCard] = React.useState({});
  let [isLoggedInUser, setLoggedInUser] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck()
    Promise.all([
        api.getUserInfo(), 
        api.getInitialCards()])
          .then(([userData, cards]) => {
              setCurrentUser(userData);
              setCards(cards);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsPageLoading(false);
          })
  }, []);

  function handleUpdateUser(user) {
    setIsPageLoading(true);
    api.setUserInfo(user)
      .then((user) => 
        setCurrentUser(user))
      .catch((err) => 
        console.log(err))
      .finally(() => 
        closeAllPopups());
  }

  function handleUpdateAvatar(user) {
    setIsPageLoading(true);
    api.setUserAva(user)
      .then((user) => 
        setCurrentUser(user))
      .catch((err) => 
        console.log(err))
      .finally(() => 
        closeAllPopups());
  }

  function handleAddCardSubmit(data) {
    setIsPageLoading(true);
    api.addCard(data)
      .then((data) => {
        setCards([data, ...cards])
      })
      .catch((err) => 
        console.log(err))
      .finally(() => 
        closeAllPopups());
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => 
        console.log(err));
  }

  function handleDeletePopup(card) {
    setIsPageLoading(true);
    currentCard = card;
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleCardDelete(card) {
    setConfirmationPopupOpen(true);
    setCurrentCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setAddCardPopupOpen(true);
  }

  function handleCardClick(id) {
    setSelectedCardOpen(id);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setIsPageLoading(false);
    setConfirmationPopupOpen(false);
    setSelectedCardOpen();
  }

  function componentDidMount() {
    tokenCheck();
  };

  function componentWillUnmount() {
    localStorage.removeItem('jwt');
    setLoggedInUser(false);
  }

  function tokenCheck() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setLoggedInUser(res.data.email);
            history.push('/');
          }
        })
        .catch(() => {
          console.log('Error');
        })
    }
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            handleLogout={componentWillUnmount}
            email={isLoggedInUser}
          />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn} 
                component={Main}                
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddCardClick}
                onCardClick={handleCardClick}
                onLikeClick={handleCardLike}
                onDeleteClick={handleCardDelete}
                cards={cards}
              />
            <Route path="/sign-up">
              <Authorization 
                heading="Регистрация"
                buttonName="Зарегистрироваться"
                subline="Уже зарегистрированы? Войти"
                submit="Registration"
              />
            </Route>
            <Route path="/sign-in">
              <Authorization 
                heading="Войти"
                buttonName="Войти"
                subline=""
                submit="Login"
                handleLogin={componentDidMount}
              />
            </Route>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
          </Switch>
          <Footer/>
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddCardPopupOpen} 
            onClose={closeAllPopups}
            onCreateCard={handleAddCardSubmit}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateAvatar}
          />    
          <ImagePopup 
            isOpen={selectedCard ? 'popup_opened' : ''} 
            card={selectedCard || ''}
            onClose={closeAllPopups}
          />
          <ConfirmationPopup 
            isOpen={isConfirmationPopupOpen} 
            onClose={closeAllPopups}
            onConfirm={handleDeletePopup}
            card={currentCard}
          /> 
          <PageIsLoading 
            isOpen={isPageLoading}
          />
        </div> 
      </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
