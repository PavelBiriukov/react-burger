import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { IconIngredients } from '../../CardOrder/IconIngredients/IconIngredients';
import style from './OrderItemInfo.module.css';
import PropTypes from 'prop-types';

export const OrderItemInfo = ({ item }) => {
  console.log(item)
  return (

    <div className={`${style.consistItem}`} key={item[0]?._id}>
      <div className={style.iconContainer}>
        <IconIngredients item={item[0]} />
        <p className={'text text_type_main-small ml-4'}>{item[0]?.name}</p>
      </div>
      <div className={`${style.price} mr-6`}>
        <p className={`${style.priceNumber} text text_type_digits-default`}>{`${item[1].count} x ${item[0]?.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

OrderItemInfo.propTypes = {
  order: PropTypes.object
}
