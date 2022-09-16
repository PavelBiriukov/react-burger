import stylesModalOverlay from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ active, closePopup }) => {
  return (
    <div className={active ? `${stylesModalOverlay.popup} ${stylesModalOverlay.active}` : `${stylesModalOverlay.popup}`}
    onClick={() => closePopup()}>
    </div>)
}

ModalOverlay.propTypes = {
  active: PropTypes.bool,
  closePopup: PropTypes.func
}
export default ModalOverlay;