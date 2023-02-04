import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, FC, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { wsConnectionClosed, wsConnectionClosedAuth, wsConnectionOpen, wsConnectionStartAuth } from '../../../services/webSocket/webSocket-action';
import { useDispatch, useSelector } from '../../../utils/hooks/reduxHooks';
import { setDate } from '../../../utils/utils';
import style from './OrderInfo.module.css'
import { OrderItemInfo } from './OrderItemInfo/OrderItemInfo';




export const OrderInfo: FC = () => {
  const orderStore = useSelector(store => store.wsReduser.orders);
  const orderStoreAuth = useSelector(store => store.wsReduser.myOrders);

  const isProfile = '/profile/orders/:id';

  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.listIgredients.feed);
  const { id }: { id: string } = useParams();

  const match = useRouteMatch();


  const popupOrder = match.path === isProfile ? orderStoreAuth : orderStore;
  const order = popupOrder.find(order => order._id === id);

  //подтянули данные по иконкам
  const conformityIngredientsIcon = useMemo(() => order?.ingredients?.map(item => {
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


  const price = useMemo(() => {
    return conformityIngredientsIcon?.reduce((sum, item) => {
      if (item?.type === 'bun') {
        return sum += item.price * 2
      }
      return sum += (item ? item.price : 0);
    }, 0);
  }, [conformityIngredientsIcon])

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


  const sortredIngredients = conformityIngredients.ingredients?.sort((a: any, b: any) => {
    if (a._id > b._id) {
      return 1
    } else if (a._id < b._id) {
      return - 1
    } else {
      return 0
    }
  })

  if (sortredIngredients?.length) {
    for (let index = 1; index < sortredIngredients?.length + 1; index++) {
      if (sortredIngredients[index] !== sortredIngredients[index - 1]) {
        newArrIngredients.push([sortredIngredients[index - 1], { count: count }]);
        count = 1;
      } else {
        count += 1
      }
    }
  }
  useEffect(() => {
    if (!order) {
      if (match.path === isProfile) {
        dispatch(wsConnectionStartAuth());
        return () => {
          dispatch(wsConnectionClosedAuth());
        }
      } else {
        dispatch(wsConnectionOpen());
        return () => {
          dispatch(wsConnectionClosed())
        };
      }
    }
  }, [order, dispatch, match.path]);

  return (
    <>
      {conformityIngredients &&
        <div className={style.orderInfo}>
          <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${conformityIngredients.number}`}</p>
          <h2 className={`${style.nameIngredient} text text_type_main-medium mt-10`}>{conformityIngredients.name}</h2>
          <p className={`${activeClass()} text text_type_main-small mt-3`}>{orderStatusRus}</p>
          <h3 className={`${style.consistTitle} text text_type_main-medium mt-15`}>Состав:</h3>
          <ul className={`${style.listOrderInfo} mt-6`}>
            {newArrIngredients?.map((item: any, index) => {
              return (
                <OrderItemInfo item={item} key={index} />
              )
            })}
          </ul>
          <div className={`${style.data} mt-10`}>
            <p className="text text_type_main-small text_color_inactive">{getChangeFormatDate}</p>
            <div className={`${style.price}`}>
              <p className={`${style.priceNumber} text text_type_digits-default`}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>}
    </>
  );
};

