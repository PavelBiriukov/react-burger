import { useSelector } from 'react-redux';
import stylesLoader from './Loader.module.css'
export const LoaderAuth = ({ children, loader }) => {
 

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