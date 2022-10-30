import React from 'react';
import ReactDOM from 'react-dom';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesModalDetails from './Modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LoaderAuth, LoaderIngredients } from '../../utils/Loader/Loader';
const modalRoot = document.querySelector('#modal');

const Modal = ({ active, onClose, children }) => {
  const loader = useSelector(store => store.authReducer.loader);
  const load = useSelector(store => store.orderDetailsReduser.loader);

  React.useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return ReactDOM.createPortal(
    <>
      {load ?
        (<>
          <LoaderIngredients />
          <ModalOverlay active={active} closePopup={onClose}></ModalOverlay>
        </>
        )
        : (
          <LoaderAuth loader={loader}>
            <div className={active ? `${stylesModalDetails.container} ${stylesModalDetails.active}` : `${stylesModalDetails.container}`}>
              <button className={`${stylesModalDetails.close} mt-7 mr-5`} onClick={onClose}>
                <CloseIcon type="primary" />
              </button>
              {children}
            </div>
            <ModalOverlay active={active} closePopup={onClose}></ModalOverlay>
          </LoaderAuth>)}
    </>
    , modalRoot
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element,
  onClose: PropTypes.func
}
export default Modal;

