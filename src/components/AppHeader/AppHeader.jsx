import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,

} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './AppHeader.module.css';
import { NavLink, Link, useLocation } from 'react-router-dom';

const AppHeader = () => {
  let currentURL = useLocation();
  
  return (
    <header className={stylesHeader.header}>
      <nav>
        <ul className={`${stylesHeader.list} pt-4 pb-4`}>
          <li className={`${stylesHeader.listItem} ml-5 mr-5 mt-4 mb-4`}>
            <NavLink
              exact to="/"
              className={stylesHeader.link}
              activeClassName={stylesHeader.link_active}
            >
              <BurgerIcon type={(currentURL.pathname === '/') ? 'primary' : 'secondary'} />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={`${stylesHeader.listItem} ml-5 mr-5 mt-4 mb-4`}>
            <NavLink
              to="/login"
              className={`${stylesHeader.link} `}
              activeClassName={stylesHeader.link_active}
            >
              <ListIcon type={(currentURL.pathname === '/sdf') ? 'primary' : 'secondary'} />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default`}>Лента заказов</p>
            </NavLink>
          </li>
          <li className={`${stylesHeader.listItem} ml-25 mr-30`}>
            <Link
              to="/"
              className={`${stylesHeader.link}`}>
              <Logo />
            </Link>
          </li>
          <li className={`${stylesHeader.listItem} ml-20 mr-5 mt-4 mb-4`}>
            <NavLink
              to='/profile'
              className={stylesHeader.link}
              activeClassName={stylesHeader.link_active}
            >
              <ProfileIcon type={(currentURL.pathname === '/profile') ? 'primary' : 'secondary'} />
              <p className={`${stylesHeader.text} ml-2 text text_type_main-default`}>Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;