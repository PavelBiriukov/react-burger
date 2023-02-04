import { FC } from 'react';
import { TLoader } from '../../services/types/types';
import stylesLoader from './Loader.module.css'

export const LoaderAuth: FC<TLoader> = ({ children, loader }) => {
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