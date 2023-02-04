import React, { FC } from 'react';
import stylesCardIngredients from './CardIngredients.module.css';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TLocation } from '../../App/App';
import { useDispatch, useSelector } from '../../../utils/hooks/reduxHooks';
import { TIngredient } from '../../../services/ingredients/ingredients-types';
import { PopupActionTypes } from '../../../services/popup/popup-type';

type TCard = {
	card: TIngredient;
}


const CardIngredients: FC<TCard> = ({ card }) => {
  const ingredients = useSelector(store => store.constructorReducer.feed);
  const bun = useSelector(store => store.constructorReducer.bun);
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();
  
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: { card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })


  const openPopup = () => {
    dispatch({
      type: PopupActionTypes.POPUP_ITEM_INFO
    })
  }
  
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
      }} 
      onClick={
        () => { openPopup()  }
      }>

      <li className={`${stylesCardIngredients.card} `}
        ref={dragRef}
        style={{ opacity }}
      >
        <img src={card.image}
          alt="`${card.name}`"
          className={`${stylesCardIngredients.img} mr-4 ml-4`}
        />
        {counter() > 0 &&
          <Counter count={counter()} size="small"/>
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

export default React.memo(CardIngredients);