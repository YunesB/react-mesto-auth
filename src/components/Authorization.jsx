import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../utils/Auth.jsx';
import InfoTooltip from './InfoTooltip.jsx';

function Authorization(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isTooltipOpen, setTooltipOpen] = React.useState(false);
    const history = useHistory();
    
    function handleTooltipOpen() {
        setTooltipOpen(true);
    }

    function closeAllPopups() {
        setTooltipOpen(false);
    }

    function handleEmailChange(evt) {
        const { value } = evt.target;
        setEmail(value)
    }
    
    function handlePasswordChange(evt) {
        const { value } = evt.target;
        setPassword(value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.signUp( email, password )
        .then((res) => {
            if (res) {
                console.log(res);
                history.push('/sign-in');
            } else {
                handleTooltipOpen();
                console.log('Error');
            }
        })
        .catch(() => {
            handleTooltipOpen();
            console.log('Error');
        });
    }

    return (
        <div className="authorization">
            <h2 class="authorization__heading">{props.heading}</h2>
            <form class="authorization__form" onSubmit={handleSubmit}>
                <input type="email" class="authorization__input" placeholder="Email" onChange={handleEmailChange} required></input>
                <input type="password" class="authorization__input" placeholder="Пароль" onChange={handlePasswordChange} required></input>
                <button type="submit" class="authorization__submit">{props.buttonName}</button>
                <Link to="/sign-in" class="authorization__link">{props.subline}</Link>
            </form>
            <InfoTooltip 
                isOpen={isTooltipOpen}
                onClose={closeAllPopups}
            />
        </div>
    );
}

export default Authorization;