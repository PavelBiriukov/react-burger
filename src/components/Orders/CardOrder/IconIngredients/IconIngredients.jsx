import React from 'react';
import PropTypes from 'prop-types';
import style from './IconsIngredients.module.css';

export const IconIngredients = React.memo(function IconIngredients({ item }) {
  return (
    <li className={style.border}>
      <div className={style.item}>
        <img className={style.img} src={item?.image_mobile} alt={item?.name} />
      </div>
    </li>
  );
});
export const IconIngredientsHiden = React.memo(function IconIngredientsHiden({ item, numberItems }) {
  return (
    <li className={`${style.border} `} key={item[0]?._id}>
      <p className={`${style.numberItems} text_type_main-small`}>{`+${numberItems}`}</p>
      <div className={`${style.item}`}>
        <img className={`${style.img} `} src={item[0]?.image_mobile} alt={item[0]?.name} />
      </div>
    </li>
  );
});

IconIngredients.propTypes = {
  item: PropTypes.object
}
IconIngredientsHiden.propTypes = {
  item: PropTypes.array,
  numberItems: PropTypes.number
}