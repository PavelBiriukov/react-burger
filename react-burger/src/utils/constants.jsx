import PropTypes from 'prop-types';
export { ingredientPropType}
const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string
  })