import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import StylesApp from './App.module.css';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [popupIngredients, setPopupIngredients] = React.useState(false);
  const [popupCard, setPopupCard] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [state, setState] = React.useState({
    data: []
  });
  React.useEffect(() => {
    getElement();
  }, []);

  const getElement = () => {
    getIngredients()
      .then(result => setState(result))
      .catch(e => console.error(e))
    }

  return (
    <div className={StylesApp.page}>
      <AppHeader />
      <Modal active={popupCard} setActive={setPopupCard}>
        <IngredientDetails card={card} />
      </Modal>
      <Modal active={popupIngredients} setActive={setPopupIngredients}>
        <OrderDetails />
      </Modal>

      <main className={`${StylesApp.main} pl-5 `}>
        <BurgerIngredients state={state} setCard={setCard} active={popupCard} setActive={setPopupCard} />
        <BurgerConstructor state={state} active={popupIngredients} setActive={setPopupIngredients} />
      </main>
    </div>
  );
}

export default App;


