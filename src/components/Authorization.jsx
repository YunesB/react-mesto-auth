import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../utils/Auth.jsx';

import InfoTooltip from './InfoTooltip.jsx';
import PageIsLoading from './PageIsLoading';

function Authorization(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isTooltipOpen, setTooltipOpen] = React.useState(false);
    const [isResAdjustments, setResAdjustments] = React.useState(false);
    const [isPageLoading, setIsPageLoading] = React.useState(false);
    const history = useHistory();

    function handleTooltipOpen() {
        setTooltipOpen(true);
    }

    function closeAllPopups() {
        setTooltipOpen(false);
    }

    function handleResAdjustments() {
        setResAdjustments(true);
    }

    function handleEmailChange(evt) {
        const { value } = evt.target;
        setEmail(value)
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handlePasswordChange(evt) {
        const { value } = evt.target;
        setPassword(value)
    }

    function handleSubmitLogin(evt) {
        setIsPageLoading(true);
        evt.preventDefault();
        if (!email || !password) {
            handleTooltipOpen();
            return;
        }
        auth.signIn(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    props.handleLogin();
                } else {
                    return
                }
            })
            .catch(() => {
                handleTooltipOpen();
            })
            .finally(() => {
                setIsPageLoading(false);
            })
    }

    function handleSubmitRegistration(evt) {
        setIsPageLoading(true);
        evt.preventDefault();
        auth.signUp(email, password)
            .then((res) => {
                if (res) {
                    handleResAdjustments();
                    handleTooltipOpen();
                    history.push('/sign-in');
                    resetForm();
                    console.log(email);
                } else {
                    handleTooltipOpen();
                    console.log('Error');
                }
            })
            .catch(() => {
                setIsPageLoading(true);
                handleTooltipOpen();
                console.log('Error');
            })
            .finally(() => {
                setIsPageLoading(false);
            })
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
            <InfoTooltip
                isOpen={isTooltipOpen}
                onClose={closeAllPopups}
                resAdjust={isResAdjustments}
            />
            <PageIsLoading
                isOpen={isPageLoading}
            />
        </div>
    );
}

export default Authorization;