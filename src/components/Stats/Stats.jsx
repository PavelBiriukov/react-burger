
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import style from './Stats.module.css'
import { NumberOrder } from './NumberOrder/NumberOrder';

export const Stats = React.memo(function Stats() {
  const { total, totalToday, orders } = useSelector(store => store.wsReduser);

  const ordersDone = useMemo(() => orders.filter(item => item.status === 'done').slice(0, 15), [orders]);
  const ordersCreated = useMemo(() => orders.filter(item => item.status !== 'done').slice(0, 15), [orders]);
  const ordersDoneRest = useMemo(() => ordersDone.slice(10, 15), [ordersDone]);
  const ordersCreatedRest = useMemo(() => ordersCreated.slice(10, 15), [ordersCreated]);

  return (
    <div className={style.stats}>
      <div className={style.ordersNumberContainer}>
        <div className={style.numberOrders}>
          <h3 className={'text text_type_main-medium pb-2'}>Готовы:</h3>
          <NumberOrder orderNumber={ordersDone} orderNumberRest={ordersDoneRest} />
        </div>
        <div className={style.numberOrders}>
          <h3 className={'text text_type_main-medium pb-2'}>В работе:</h3>
          <NumberOrder orderNumber={ordersCreated} orderNumberRest={ordersCreatedRest}/>
        </div>
      </div>
      <div className={style.ordersContainer}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={style.ordersContainer}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
});
