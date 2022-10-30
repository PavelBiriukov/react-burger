
import { ItemNumberOrder } from './ItemNumberOrder/ItemNumberOrder';
import style from './NumberOrder.module.css';
import PropTypes from 'prop-types';


export const NumberOrder = ({ orderNumber, orderNumberRest }) => {

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
NumberOrder.propTypes = {
  orderNumber: PropTypes.array,
  orderNumberRest: PropTypes.array,
}