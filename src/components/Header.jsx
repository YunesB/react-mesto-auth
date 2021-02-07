import mestoLogo from '../images/logo.svg'
import React from 'react';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    props.handleLogout();
    history.push('/sign-up');
  }
  return (
        <header className="header">
          <a href="#" className="header__link">
            <img src={mestoLogo} className="header__logo" alt="Логотип проекта Mesto"/>
          </a>
          <button onClick={signOut} className="header__button">Выйти</button>
        </header>
  );
}

export default Header;
