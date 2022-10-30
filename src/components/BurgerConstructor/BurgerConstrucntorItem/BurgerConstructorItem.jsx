import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import stylesConstructor from './BurgerConstructorItem.module.css';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CHANGE_ITEM, DELETE_ITEM } from '../../../services/action/constructorAction';


const BurgerConstructorItem = ({type, id, image, price, name, index}) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.constructorReducer.feed);
  const ref = useRef(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'movie',
    item: { ingredients, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const [{}, dropRefMovie] = useDrop({
    accept: 'movie',
    hover(item) {
      const dragIndex = item.index;
      const dropIndex = index;
      dispatch({
        type: CHANGE_ITEM,
        data: {dragIndex, dropIndex}
      });
      item.index = dropIndex;
    },
  })
  const deleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      id: id
    })
  }
  dropRefMovie(dragRef(ref));
  return (
    <>
      <li className={`${stylesConstructor.ingredient} mr-2`} style={{opacity}} ref={ref}>
        <DragIcon type="primary" />
        <ConstructorElement
          type={type}
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => deleteItem(id)}
        />
      </li>
    </>
  );
};
BurgerConstructorItem.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  index: PropTypes.number
}
export default React.memo (BurgerConstructorItem)