import React from 'react';
import stylesCardIngredients from './CardIngredients.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
const CardIngredients = (props) => {
  return (
    <div className={`${stylesCardIngredients.card} `} onClick={() => {props.setActive(true); props.setData(props.card)}}>
      <img src={props.card.image} alt="" className={`${stylesCardIngredients.img} mr-4 ml-4`} />
      <Counter count={1} size="small" className={stylesCardIngredients.counter} />
      <p className={`${stylesCardIngredients.price} text text_type_digits-default mt-1 mb-1`}>
        {props.card.price}
        <span className='ml-2'><CurrencyIcon type="primary" /></span>
      </p>
      <p className={`${stylesCardIngredients.name} text text_type_main-default`}>{props.card.name}</p>
    </div>
  )
}

CardIngredients.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func
}
export default CardIngredients;