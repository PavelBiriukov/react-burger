import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,

} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={stylesHeader.header}>
      <nav>
        <ul className={`${stylesHeader.list} pt-4 pb-4`}>
          <li className={`${stylesHeader.listItem} ml-5 mr-5 mt-4 mb-4`}>
            <a href="#" className={stylesHeader.link}>
              <BurgerIcon type="primary" />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default`}>Конструктор</p>
            </a>
          </li>
          <li className={`${stylesHeader.listItem} ml-5 mr-5 mt-4 mb-4`}>
            <a href="#" className={`${stylesHeader.link} `}>
              <ListIcon type="secondary" />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default text_color_inactive`}>Лента заказов</p>
            </a>
          </li> 
          <li className={`${stylesHeader.listItem} ml-25 mr-30`}>
            <a href="#" className={`${stylesHeader.link}`}>
              <Logo/>
            </a>
          </li>
          <li className={`${stylesHeader.listItem} ml-20 mr-5 mt-4 mb-4`}>
            <a href="#" className={stylesHeader.link}>
              <ProfileIcon type="secondary" />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default text_color_inactive`}>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;