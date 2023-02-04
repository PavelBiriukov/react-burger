
import stylesOrderDetails from './OrderDetails.module.css';
import successImg from '../../../image/done.jpg'
import React, { FC } from 'react';
import { useSelector } from '../../../utils/hooks/reduxHooks';

const OrderDetails: FC = () => {
  const order = useSelector(store => store.orderDetailsReduser.order);
  
  return (
    <>
      <h2 className={`${stylesOrderDetails.number} mt-30 mb-0 text text_type_digits-large`}>{order}</h2>
      <h3 className={`mt-8 mb-15 text text_type_main-medium`}>идентификатор заказа</h3>
      <img src={successImg} alt="Галочка с фоном" className={stylesOrderDetails.success} />
      <h4 className={`mt-15 mb-0 text text_type_main-default`}>Ваш заказ начали готовить</h4>
      <p className={`mt-2 mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>)
}

export default OrderDetails;