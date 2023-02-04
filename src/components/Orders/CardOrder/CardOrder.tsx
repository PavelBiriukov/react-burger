import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useMemo, FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setDate } from '../../../utils/utils';
import style from './CardOrder.module.css'
import { IconIngredients, IconIngredientsHiden } from './IconIngredients/IconIngredients';
import { TLocation } from '../../App/App';
import { useDispatch, useSelector } from '../../../utils/hooks/reduxHooks';
import { TIngredient } from '../../../services/ingredients/ingredients-types';
import { TOrder1 } from '../../../services/webSocket/WebSocket-type';
import { TOrderImage } from '../../../services/types/types';
import { PopupActionTypes } from '../../../services/popup/popup-type';
import { FetchPopapDetalisAction } from '../../../services/popupDetails/popupDetails-type';


type TOrdersInfoDetails = {
	order: TOrder1;
}

export const CardOrder: FC<TOrdersInfoDetails> = React.memo(function CardOrder({ order }) {
  const ingredients = useSelector(store => store.listIgredients.feed);

  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  let ingredientsArr:TIngredient[] = [];
  let lastItem:TIngredient[] | null = [];
  let numberItems: null | number = null;

  //подтянули данные по иконкам
  const conformityIngredientsIcon = useMemo(() => order.ingredients?.map(item => {
    return ingredients?.find(ingredient => {
      return ingredient._id === item
    })
  }), [ingredients, order.ingredients]);

  //создали новый массив заказа с измененными данными иконок
  const conformityIngredients = [{ ...order, ingredients: conformityIngredientsIcon }];
  const price = useMemo(() => {
    return conformityIngredientsIcon?.reduce((sum, item) => {
        if (item?.type === 'bun') {
            return sum += item.price * 2
        }
        return sum += (item ? item.price : 0);
    }, 0);
}, [conformityIngredientsIcon])

  const getItemInfo = useCallback((item: TOrderImage[], priceOrder: any) => {
    dispatch({
      type: FetchPopapDetalisAction.POPUP_ITEM,
      item: item,
      priceOrder: priceOrder
    })
  }, [dispatch])

  const openPopup = useCallback(() => {
    getItemInfo(conformityIngredients, price);
    dispatch({
      type: PopupActionTypes.POPUP_ORDER_ITEM_INFO
    })
  }, [dispatch, conformityIngredientsIcon])

  //обрезка кол-ва иконок 
  const reduceItemsIngredients = (arr: any) => {
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
          <p className={`${style.priceNumber} text text_type_digits-default`}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    </Link>

  );
});
