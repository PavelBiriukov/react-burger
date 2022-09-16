import React from 'react';
import stylesLoader from './Loader.module.css'
const Loader = () => {
  return (
    <>
      <div className={`${stylesLoader.loader}`}></div>
    </>
  );
};

export default Loader;