import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './constructorRow.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ConstructorRow({isBun = false, type, data}) {

  return (
    isBun
      ? <div className={`${styles.bun} pl-4 pr-4`}>
          <ConstructorElement
            type={type}
            text={`${data.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
            price={data.price}
            thumbnail={data.image}
            isLocked='true'
          />
        </div>
      : <li className={`${styles.ingredient} mt-4 mb-4`}>
          <DragIcon/>
          <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
      />
    </li>
  )
}

ConstructorRow.propTypes = {
  isBun: PropTypes.bool,
  type: PropTypes.string,
  data: ingredientPropTypes.isRequired,
}