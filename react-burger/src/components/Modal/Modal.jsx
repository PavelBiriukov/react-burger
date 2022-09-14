import React from 'react';
import ReactDOM from 'react-dom';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesModalDetails from './Modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal');

const Modal = (props) => {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        props.setActive(false)
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [])
  return ReactDOM.createPortal(
    <>
      <div className={props.active ? `${stylesModalDetails.container} ${stylesModalDetails.active}` : `${stylesModalDetails.container}`}
        >
        <button className={`${stylesModalDetails.close} mt-7 mr-5`} onClick={() => props.setActive(false)}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay active={props.active} setActive={props.setActive} onClick={() => props.setActive(false)}></ModalOverlay>
    </>
    , modalRoot)
}

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func
}
export default Modal;