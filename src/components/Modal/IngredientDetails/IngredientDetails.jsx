
import stylesIngredientDetails from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const itemInfo = useSelector(store => store.IngredientDetailsReducer.item);
  return (
    <>
      <h2 className={`${stylesIngredientDetails.title} mt-10 mb-0 ml-10 mr-10 text_type_main-large`}>Детали ингредиента</h2>
      <img src={itemInfo.image} alt={itemInfo.name} className={`${stylesIngredientDetails.img} mr-4 ml-4`} />
      <h3 className={`mt-4 text text_type_main-medium`}>{itemInfo.name}</h3>
      <ul className={`${stylesIngredientDetails.list} mt-8 mb-15`}>
        <li className={`${stylesIngredientDetails.listItem}`}>
          <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{itemInfo.calories}</p>
        </li>
        <li className={`${stylesIngredientDetails.listItem} ml-5`}>
          <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{itemInfo.proteins} </p>
        </li>
        <li className={`${stylesIngredientDetails.listItem} ml-5`}>
          <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{itemInfo.fat}</p>
        </li>
        <li className={`${stylesIngredientDetails.listItem} ml-5`}>
          <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{itemInfo.carbohydrates} </p>
        </li>
      </ul>
    </>)
}

export default IngredientDetails;