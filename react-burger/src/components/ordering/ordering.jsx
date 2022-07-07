import React from 'react';
import PropTypes from 'prop-types';
import styles from './ordering.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


export default function Ordering({total}) {

  return (
    <div className={`${styles.ordering} mt-10`}>
        <div className={`${styles.total} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{total}</p>
          <CurrencyIcon type='primary' />
        </div>  
        <Button type='primary' size='large'>Оформить заказ</Button>
      </div>
  )
}

Ordering.propTypes = {
  total: PropTypes.number
}