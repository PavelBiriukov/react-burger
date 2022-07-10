import React from 'react';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesModalDetails from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <ModalOverlay active={props.active} setActive={props.setActive}>
      <div className={stylesModalDetails.container} onClick={e => e.stopPropagation()}>
        <button className={`${stylesModalDetails.close} mt-7 mr-5`} onClick={() => props.setActive(false)}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </ModalOverlay>)
}

Modal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func
}
export default Modal;