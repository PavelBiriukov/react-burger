import { useSelector } from 'react-redux';
import stylesLoader from './Loader.module.css'
export const LoaderAuth = ({ children }) => {
  const loader = useSelector(store => store.authReducer.loader);

  return (
    <>
      {
        !loader ?
          children :
          <div className={`${stylesLoader.loader}`}></div>
      }
    </>
  );
};

export const LoaderIngredients = () => {
  return (
    <>
      <div className={`${stylesLoader.loader} ${stylesLoader.loaderIngredients}`}></div>
    </>
  );
};