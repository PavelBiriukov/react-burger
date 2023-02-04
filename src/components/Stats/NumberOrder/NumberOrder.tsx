
import { ItemNumberOrder } from './ItemNumberOrder/ItemNumberOrder';
import style from './NumberOrder.module.css';
import PropTypes from 'prop-types';
import {FC} from 'react';
import { TOrder1 } from '../../../services/webSocket/WebSocket-type';

export type TNumberOrder = {
	orderNumber: TOrder1[],
  orderNumberRest: TOrder1[]
};


export const NumberOrder: FC<TNumberOrder> = ({ orderNumber, orderNumberRest }) => {

  return (
    <div className={style.list}>
      <ul className={style.listNumberOrders}>
        {orderNumber &&
          orderNumber.map((item, index) => {
            if (index > 10) {
              return
            }
            return <ItemNumberOrder item={item} key={item._id} />
          })}
      </ul>
      {orderNumberRest &&
        <ul className={style.listNumberOrders}>
          {orderNumberRest.map(item => {
            return <ItemNumberOrder item={item} key={item._id} />
          })}
        </ul>
      }
    </div>
  );
};
