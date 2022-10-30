import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { setDate } from '../../../utils/utils';
import style from './OrderInfo.module.css'
import { OrderItemInfo } from './OrderItemInfo/OrderItemInfo';
import PropTypes from 'prop-types';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_START, WS_CONNECTION_START_AUTH } from '../../../services/action/wsActions';

export const OrderInfo = () => {
  const orderStore = useSelector(store => store.wsReduser.orders);
  const orderStoreAuth = useSelector(store => store.wsReduser.myOrders);

  const isProfile = '/profile/orders/:id';
  const isFeed = '/feed/:id';


  const ingredients = useSelector(store => store.listIgredients.feed);
  const { id } = useParams();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const popupOrder = match.path === isProfile ? orderStoreAuth : orderStore;
  const order = popupOrder.find(order => order._id === id);

  useEffect(() => {
    if (!order) {
      if (match.path === isProfile) {
        dispatch({ type: WS_CONNECTION_START_AUTH });
        return () => dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
      } else {
        dispatch({ type: WS_CONNECTION_START });
        return () => dispatch({ type: WS_CONNECTION_CLOSED });
      }
    }
  }, [order, dispatch, match.path])

  //подтянули данные по иконкам
  const conformityIngredientsIcon = useMemo(() => order?.ingredients.map(item => {
    return ingredients?.find(ingredient => {
      return ingredient._id === item
    })
  }), [ingredients, order?.ingredients]);

  //создали новый массив заказа с измененными данными иконок
  const conformityIngredients = { ...order, ingredients: conformityIngredientsIcon };

  const bunOrder = useMemo(() =>
    conformityIngredientsIcon?.find(item => item?.type === 'bun'),
    [conformityIngredientsIcon]
  );
  const priceOrder = useMemo(() =>
    conformityIngredientsIcon?.reduce((sum, item) => +sum + item?.price, [bunOrder?.price]),
    [conformityIngredientsIcon, bunOrder]
  );

  const activeClass = () => {
    return conformityIngredients.status === 'done' ? 'text_color_success' : ''
  }
  const orderStatusRus = useMemo(() =>
    order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создается' : 'Ожидается',
    [order, order?.status]
  )
  const getChangeFormatDate = setDate(conformityIngredients.createdAt);

  const newArrIngredients = [];
  let count = 1;

  const sortredIngredients = conformityIngredients.ingredients?.sort((a, b) => {
    if (a._id > b._id) {
      return 1
    } else if (a._id < b._id) {
      return - 1
    } else {
      return 0
    }
  })

  for (let index = 1; index < sortredIngredients?.length + 1; index++) {
      if (sortredIngredients[index] !== sortredIngredients[index-1]) {
        newArrIngredients.push([sortredIngredients[index - 1], {count: count}]);
        count = 1;
      } else {
        count += 1
      }
    } 

  return (
    <>
      {conformityIngredients &&
        <div className={style.orderInfo}>
          <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${conformityIngredients.number}`}</p>
          <h2 className={`${style.nameIngredient} text text_type_main-medium mt-10`}>{conformityIngredients.name}</h2>
          <p className={`${activeClass()} text text_type_main-small mt-3`}>{orderStatusRus}</p>
          <h3 className={`${style.consistTitle} text text_type_main-medium mt-15`}>Состав:</h3>
          <ul className={`${style.listOrderInfo} mt-6`}>
            {newArrIngredients?.map((item, index) => {
              return (
                <OrderItemInfo item={item} key={index} />
              )
            })}
          </ul>
          <div className={`${style.data} mt-10`}>
            <p className="text text_type_main-small text_color_inactive">{getChangeFormatDate}</p>
            <div className={`${style.price}`}>
              <p className={`${style.priceNumber} text text_type_digits-default`}>{priceOrder}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>}
    </>
  );
};

OrderItemInfo.propTypes = {
  popupOrder: PropTypes.array
}
