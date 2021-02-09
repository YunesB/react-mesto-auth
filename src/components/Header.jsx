/* eslint-disable react/jsx-no-target-blank */
import mestoLogo from '../images/logo.svg'
import React from 'react';
import { useHistory } from 'react-router-dom';

function Header(props) {

  const [isLinkText, setLinkText] = React.useState('')
  const [isLink, setLink] = React.useState('')
  const history = useHistory();
  const currentLoaction = history.location.pathname;

  React.useEffect(() => {
    if (currentLoaction === "/sign-up") {
      setLink('/sign-in');
      setLinkText('Войти');
    } else if (currentLoaction === "/sign-in") {
      setLink('/sign-up');
      setLinkText('Регистрация');
    } else if (currentLoaction === "/") {
      setLink('/sign-in');
      setLinkText('Выйти');
    } else {
      setLink('/');
      setLinkText('На главную');
    }
  });

  function signOut() {
    localStorage.removeItem('jwt');
    props.handleLogout();
    history.push('/sign-in');
  };

  return (
        <header className="header">
          <a href="https://ya.ru" target="_blank" className="header__link">
            <img src={mestoLogo} className="header__logo" alt="Логотип проекта Mesto"/>
          </a>
          <div className="header__container">
            <span className="header__email-container">{props.email}</span>
            <a href={isLink} onClick={signOut} className="header__link-item">{isLinkText}</a>
          </div>
        </header>
  );
}

export default Header;
