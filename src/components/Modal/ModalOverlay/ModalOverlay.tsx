import stylesModalOverlay from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { TModal, TModalOverlay } from '../../../services/types/types';




const ModalOverlay: FC<TModalOverlay> = ({ active, closePopup }) => {
  return (
    <div className={active ? `${stylesModalOverlay.popup} ${stylesModalOverlay.active}` : `${stylesModalOverlay.popup}`}
      onClick={closePopup}>
    </div>)
}


export default ModalOverlay;