function SignIn(props) {
    return (
        <div className="authorization">
            <h1 class="authorization__heading">{props.heading}</h1>
            <form class="authorization__form">
                <input type="email" class="authorization__input" placeholder="Email"></input>
                <input type="password" class="authorization__input" placeholder="Пароль"></input>
                <button type="submit" class="authorization__submit">{props.buttonName}</button>
            </form>
            <span>{props.subline || ''}</span>
        </div>
    );
}

export default SignIn;