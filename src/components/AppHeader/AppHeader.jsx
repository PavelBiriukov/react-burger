import React from 'react';
import  {BurgerIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader = () =>
{
  return (
      <header className={styles.header}>
        <div className={styles.content}>
          <nav className="mt-4 mb-4">
              <ul className={styles.menu}>
                  <li>
                    <a href="#" className={`${styles.link} pr-5 pl-5 mr-2`}>
                    <BurgerIcon type="primary"/>
                    <p className={`${styles.linkItem} ml-2 text text_type_main-default`}>Конструктор</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`${styles.link} pr-5 pl-5`}>
                    <ListIcon type="secondary" />
                    <p className={`${styles.linkItem} ml-2 text text_type_main-default text_color_inactive`}>Лента заказов</p>
                    </a>
                  </li>
              </ul>
          </nav>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div>
            <nav className="mt-4 mb-4">
              <a href="#" className={`${styles.link} pr-5 pl-5`}>
                <ProfileIcon type="secondary" />
                <p className={`${styles.linkItem} ml-2 text text_type_main-default text_color_inactive`}>Личный кабинет</p>
              </a>
            </nav>
          </div>
          </div>
      </header>
  )
}
export default AppHeader;
