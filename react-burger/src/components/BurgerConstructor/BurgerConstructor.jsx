import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './BurgerConstructor.module.css';
import ConstructorRow from '../constructorRow/constructorRow';
import Ordering from '../ordering/ordering';

export default function BurgerConstructor({data}) {

  const [totalPrice, setTotalPrice] = React.useState(null);

  React.useEffect(() => {
    const sum = data.reduce((prev, item) => {
      return prev + item.price;
    }, 0);

    setTotalPrice(sum);

  },[JSON.stringify(data)])

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <ConstructorRow isBun={true} type='top' data={data[0]} />
        <ul className={`${styles.fills} custom-scroll`}>
          {data.map((ing, pos, array) => {
            if(pos > 0 && (pos !== array.length - 1)) {
              return (<ConstructorRow key={ing._id} data={ing} />);
            }
            return null;
          })}
        </ul>
        <ConstructorRow isBun={true} type='bottom' data={data[0]} />
      </div>
      <Ordering total={totalPrice} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired)
}