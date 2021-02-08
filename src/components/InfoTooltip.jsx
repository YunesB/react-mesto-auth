import loading from '../images/loading.svg';
import reg_fail from '../images/reg_fail.svg';
import reg_success from '../images/reg_success.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? ' popup_opened ' : " "}`} >
          <div className="popup__tooltip">
            <img src={reg_success || loading} alt={'name'} className="popup__tooltip-image"/>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__tooltip-heading">Вы успешно зарегистрировались!</h3>
          </div>
        </div>
    );
}

export default InfoTooltip;