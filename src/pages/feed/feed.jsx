import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Orders } from '../../components/Orders/Orders';
import { Stats } from '../../components/Stats/Stats';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/action/wsActions';
import style from './feed.module.css';

export const Feed = () => {
  const orders = useSelector(store => store.wsReduser.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, []);
  return (
    <section className={style.feed}>
      <h1 className='text text_type_main-large mt-10 mb-5 '>Лента заказов</h1>
      <div className={`${style.orders} `}>

        <Orders orders={orders} />
        <Stats />
      </div>
    </section>
  );
};
