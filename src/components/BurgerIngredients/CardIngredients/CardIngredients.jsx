import React, { useCallback } from 'react';
import stylesCardIngredients from './CardIngredients.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { POPUP_ITEM } from '../../../services/action/IngredientDetailsAction';
import { Link, useLocation } from 'react-router-dom';

const CardIngredients = ({ card, setActive }) => {
  const ingredients = useSelector(store => store.constructorReducer.feed);
  const bun = useSelector(store => store.constructorReducer.bun);
  const location = useLocation();
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: { card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const getItemInfo = useCallback((item) => {
    dispatch({
      type: POPUP_ITEM,
      item: item
    })
  }, [dispatch])

  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let item of ingredients) {
          if (item.card._id === card._id) count++;
        }
        if ((bun.length !== 0) && (bun[0].card._id === card._id)) count = count + 2;
        return count
      },
    [ingredients, bun]
  );


  return (
    <Link className={stylesCardIngredients.link}
      to={{
        pathname: `/ingredients/${card._id}`,
        state: { background: location }
      }} >

      <li className={`${stylesCardIngredients.card} `}
        ref={dragRef}
        style={{ opacity }}
        onClick={
          () => { setActive(true); getItemInfo(card) }
        }
      >
        <img src={card.image}
          alt="`${card.name}`"
          className={`${stylesCardIngredients.img} mr-4 ml-4`}
        />
        {counter() > 0 &&
          <Counter count={counter()} size="small" className={stylesCardIngredients.counter} />
        }
        <p className={`${stylesCardIngredients.price} text text_type_digits-default mt-1 mb-1`}>
          {card.price}
          <span className='ml-2'><CurrencyIcon type="primary" /></span>
        </p>
        <p className={`${stylesCardIngredients.name} text text_type_main-default`}>{card.name}</p>
      </li>
    </Link >
  )
}

CardIngredients.propTypes = {
  card: PropTypes.object,
  setActive: PropTypes.func
}
export default React.memo(CardIngredients);