import React from 'react';
import stylesCardIngredients from './CardIngredients.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
const CardIngredients = ({ props }) => {
  return (
    <div className={`${stylesCardIngredients.card} `}>
      <img src={props.image} alt="" className={`${stylesCardIngredients.img} mr-4 ml-4`} />
        <Counter count={1} size="small" className={stylesCardIngredients.counter}/>
      <p className={`${stylesCardIngredients.price} text text_type_digits-default mt-1 mb-1`}>
        {props.price}
        <span className='ml-2'><CurrencyIcon type="primary" /></span>
      </p>
      <p className={`${stylesCardIngredients.name} text text_type_main-default`}>{props.name}</p>
    </div>
  )
}

CardIngredients.propTypes = {
  props: PropTypes.object.isRequired
}
export default CardIngredients;