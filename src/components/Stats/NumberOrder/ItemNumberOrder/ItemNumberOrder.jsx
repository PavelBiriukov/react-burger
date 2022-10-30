import React from 'react';
import PropTypes from 'prop-types';

export const ItemNumberOrder = ({ item }) => {
  const styleOrder = item.status === 'done' ? 'text_color_success' : ''; 
  return (
    <>
      <li className={`text text_type_digits-default ${styleOrder}`}>{item.number}</li>
    </>
  );
};
ItemNumberOrder.propTypes = {
  item: PropTypes.object
}