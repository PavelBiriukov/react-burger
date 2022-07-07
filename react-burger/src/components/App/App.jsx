import React from 'react';
import pageStyle from './App.module.css';
import AppHeader from '../header/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {arr, arrConstructor} from '../../utils/data';
import {  } from '../../utils/data';
export default function App () {
    return(
        <div className={pageStyle.page}>
          <AppHeader />
          <main className={`${pageStyle.main} pl-5 `}>
            <BurgerIngredients data={arr}/>
            <BurgerConstructor data={arrConstructor} />
          </main>
        </div>
    )
}


