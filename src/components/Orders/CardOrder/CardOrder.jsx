import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { POPUP_ITEM } from '../../../services/action/IngredientDetailsAction';
import { POPUP_ORDER_ITEM_INFO } from '../../../services/action/popupAction';
import PropTypes from 'prop-types';
import { setDate } from '../../../utils/utils';
import style from './CardOrder.module.css'
import { IconIngredients, IconIngredientsHiden } from './IconIngredients/IconIngredients';

export const CardOrder = React.memo(function CardOrder({ order }) {
  const ingredients = useSelector(store => store.listIgredients.feed);

  const location = useLocation();
  const dispatch = useDispatch();

  let ingredientsArr = [];
  let lastItem = [];
  let numberItems = null;

  //подтянули данные по иконкам
  const conformityIngredientsIcon = useMemo(() => order.ingredients?.map(item => {
    return ingredients?.find(ingredient => {
      return ingredient._id === item
    })
  }), [ingredients, order.ingredients]);

  //создали новый массив заказа с измененными данными иконок
  const conformityIngredients = [{ ...order, ingredients: conformityIngredientsIcon }];
  const bunOrder = useMemo(() => conformityIngredientsIcon.find(item => item?.type === 'bun'), [conformityIngredientsIcon]);
  const priceOrder = useMemo(() => conformityIngredientsIcon.reduce((sum, item) => +sum + item?.price, [bunOrder?.price]), [conformityIngredientsIcon, bunOrder]);

  const getItemInfo = useCallback((item, priceOrder) => {
    dispatch({
      type: POPUP_ITEM,
      item: item,
      priceOrder: priceOrder
    })
  }, [dispatch])

  const openPopup = useCallback(() => {
    getItemInfo(conformityIngredients, priceOrder);
    dispatch({
      type: POPUP_ORDER_ITEM_INFO
    })
  }, [dispatch, conformityIngredientsIcon])

  //обрезка кол-ва иконок 
  const reduceItemsIngredients = (arr) => {
    if (arr.length > 5) {
      ingredientsArr = arr.slice(0, 5);
      lastItem = arr.slice(-1);
      numberItems = arr.length - 5;
    } else {
      ingredientsArr = arr;
      lastItem = null;
      numberItems = null;
    }
  }
  //отрисовка иконок в заказе
  const drawIconsItems = useCallback(() => {
    reduceItemsIngredients(conformityIngredientsIcon);
    return (

      <ul className={`${style.listImg} mt-6`}>
        {ingredientsArr.map((item, index) => {
          return (
            <IconIngredients item={item} key={index} />)
        })}
        {lastItem &&
          (
            <IconIngredientsHiden item={lastItem} numberItems={numberItems} />
          )
        }
      </ul>
    )
  }, [order, conformityIngredientsIcon])

  const activeClass = () => {
    return order.status === 'done' ? 'text_color_success' : ''
  }

  const orderStatusRus = useMemo(() =>
    order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создается' : 'Ожидается',
    [order, order?.status]
  )

  const getChangeFormatDate = setDate(order.createdAt);

  return (
    <Link to={{
      pathname: `${location.pathname}/${order._id}`,
      state: { background: location }
    }}
      onClick={() => openPopup()}
      className={style.link}>
      <li className={`${style.order} p-6 mr-2`}>
        <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${order.number}`}</p>
        <p className={`${style.orderTime} text text_type_main-small text_color_inactive`}>{getChangeFormatDate}</p>
        {order.status ? (
          <p className={`${activeClass()} text text_type_main-small mt-2`}>{orderStatusRus}</p>
        ) : ''}
        <h2 className={`${style.nameBurger} text text_type_main-medium mt-6`}>{order.name}</h2>
        {drawIconsItems()}
        <div className={`${style.price} mt-6 ml-6`}>
          <p className={`${style.priceNumber} text text_type_digits-default`}>{priceOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    </Link>

  );
});


CardOrder.propTypes = {
  order: PropTypes.object
}