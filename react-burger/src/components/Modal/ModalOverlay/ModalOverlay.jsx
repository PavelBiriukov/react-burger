import React from 'react';
import stylesModalOverlay from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  React.useEffect(() => {
    const ECK_KEYCODE = 27;
    const close = (e) => {
      if (e.keyCode === ECK_KEYCODE) {
        props.setActive(false)
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [])
  return (
    <div className={props.active ? `${stylesModalOverlay.popup} ${stylesModalOverlay.active}` : `${stylesModalOverlay.popup}`}
    onClick={() => props.setActive(false)}>
      {props.children}
    </div>)
}

ModalOverlay.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func
}
export default ModalOverlay;