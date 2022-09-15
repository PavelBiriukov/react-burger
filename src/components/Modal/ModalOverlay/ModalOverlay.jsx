import stylesModalOverlay from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return (
    <div className={props.active ? `${stylesModalOverlay.popup} ${stylesModalOverlay.active}` : `${stylesModalOverlay.popup}`}
    onClick={() => props.setActive(false)}>
    </div>)
}

ModalOverlay.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func
}
export default ModalOverlay;