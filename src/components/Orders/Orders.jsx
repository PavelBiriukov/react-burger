import PropTypes from 'prop-types';
import { CardOrder } from './CardOrder/CardOrder';
import style from './Orders.module.css'

export const Orders = ({ orders }) => {

  return (
    orders &&
      (<ul className={`${style.listOrders}`}>
        {orders.map(order => {
          return <CardOrder order={order} key={order._id} />
        })}
      </ul>
)
  );
};

Orders.propTypes = {
  orders: PropTypes.array
}