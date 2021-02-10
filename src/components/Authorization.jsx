import React from 'react';
import { Link } from 'react-router-dom';

function Authorization(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(evt) {
        const { value } = evt.target;
        setEmail(value)
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    };

    // почему resetForm не работает? не могу понять :) Куда бы я его не ставил, нигде не обнуляет инпуты.

    function handlePasswordChange(evt) {
        const { value } = evt.target;
        setPassword(value)
    };

    function handleSubmitLogin(evt) {
        evt.preventDefault();
        props.handleSubmit(email, password);
        resetForm()
    };

    function handleSubmitRegistration(evt) {
        evt.preventDefault();
        props.handleSubmit(email, password);
        resetForm()
    }

    return (
        <div className="authorization">
            <h2 className="authorization__heading">{props.heading}</h2>
            <form className="authorization__form" onSubmit={props.submit === 'Login' ? handleSubmitLogin : handleSubmitRegistration}>
                <input type="email" className="authorization__input" placeholder="Email" onChange={handleEmailChange} required></input>
                <input type="password" className="authorization__input" placeholder="Пароль" onChange={handlePasswordChange} required></input>
                <button type="submit" className="authorization__submit">{props.buttonName}</button>
                <Link to="/sign-in" className="authorization__link">{props.subline}</Link>
            </form>
        </div>
    );
}

export default Authorization;