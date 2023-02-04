import { useEffect, FC } from 'react';
import { Orders } from '../../components/Orders/Orders';
import { Stats } from '../../components/Stats/Stats';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/webSocket/webSocket-action';
import { useDispatch, useSelector } from '../../utils/hooks/reduxHooks';
import style from './feed.module.css';

export const Feed: FC = () => {
  const orders = useSelector(store => store.wsReduser.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionOpen());
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch]);

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
