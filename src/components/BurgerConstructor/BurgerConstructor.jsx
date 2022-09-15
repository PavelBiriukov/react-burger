import { useEffect, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesConstructor from './BurgerConstructor.module.css';
import { IngredientsContext } from '../../services/IngredientsContext';

function reducer(data, action) {
  console.log(data)
  switch (action.type) {
    case'price': 
      return console.log(data)
    default:
      return data
  }

}


const BurgerConstructor = (props) => {
  const { state } = useContext(IngredientsContext);
  const [total, setTotal] = useState(0);
  let burgerId = useMemo(() => state.data.map((item) => item._id), [state.data]);

  const filling = useMemo(() => state.data.filter((item) => item.type !=='bun'), [state.data]);
  const bunFilter = useMemo(
    () => state.data.find((item) => item.type === 'bun')
  );

  useEffect(() => {
    const totalPrice = filling.reduce((sum, item) => sum + item.price, bunFilter ? (bunFilter.price * 2) : 0)
    setTotal(totalPrice)
  }, [bunFilter, filling])
  return (
    <section className={`${stylesConstructor.constructor} mt-25 ml-10`}>
      <div className={`${stylesConstructor.ingredient} ml-8`}>
        {bunFilter && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunFilter.name} (вверх)`}
          price={bunFilter.price}
          thumbnail={bunFilter.image}
        />}
      </div>
      <div className={`${stylesConstructor.topings}`}>
        {state.data.map((el) => {
          if (el.type === "main" || el.type === "sauce") {
            return (
              <div className={`${stylesConstructor.ingredient}`} key={el._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </div>)
          }
        })}
      </div>
      <div className={`${stylesConstructor.ingredient} ml-8`}>
        {bunFilter && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunFilter.name} (низ)`}
          price={bunFilter.price}
          thumbnail={bunFilter.image}
        />}
      </div>
      <div className={`${stylesConstructor.order} mt-6`}>
        <p className={`text text_type_digits-medium`}>
          {total}
          <span className='ml-2'><CurrencyIcon type="primary" /></span>
        </p>
        <Button type="primary" size="large" onClick={() => {
          props.setActive(true);
          props.getOrder(burgerId)
        }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
BurgerConstructor.propTypes = {
  total: PropTypes.number,
  state: PropTypes.object,
  setActive: PropTypes.func
}
export default BurgerConstructor;