
import stylesIngredientDetails from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../utils/hooks/reduxHooks';

const IngredientDetails = () => {
  const ingredients = useSelector(store => store.listIgredients.feed);

  const { id }: { id: string } = useParams();
  const ingredient = ingredients.find(ingredient => ingredient._id === id);
  return (
    <>
      {
        ingredient &&
        (
          <section className={stylesIngredientDetails.ingredientDetails}>
            <h2 className={`${stylesIngredientDetails.title} mt-10 mb-0 ml-10 mr-10 text_type_main-large`}>Детали ингредиента</h2>
            <img src={ingredient.image} alt={ingredient.name} className={`${stylesIngredientDetails.img} mr-4 ml-4`} />
            <h3 className={`mt-4 text text_type_main-medium`}>{ingredient.name}</h3>
            <ul className={`${stylesIngredientDetails.list} mt-8 mb-15`}>
              <li className={`${stylesIngredientDetails.listItem}`}>
                <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
              </li>
              <li className={`${stylesIngredientDetails.listItem} ml-5`}>
                <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Белки, г</p>
                <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{ingredient.proteins} </p>
              </li>
              <li className={`${stylesIngredientDetails.listItem} ml-5`}>
                <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Жиры, г</p>
                <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
              </li>
              <li className={`${stylesIngredientDetails.listItem} ml-5`}>
                <p className={`${stylesIngredientDetails.name} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                <p className={`${stylesIngredientDetails.name} mt-2 mb-18 text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates} </p>
              </li>
            </ul>
          </section>

        )
      }
    </>
  )
}

export default IngredientDetails;