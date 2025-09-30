import React from 'react';

import Center from '../../components/Center';
import HEADER from "../../data/header.json";

import style from "./style.module.css";
import Link from '../../components/Link';
import getFaIcon from '../../helper/icons';

const Header = () => {
  const { light_logo, dark_logo, menu_links = [], contact_number } = HEADER;

  return (
    <header className={style.header}>
      <Center>
        <div className={style.container}>
          <div className={style.lightLogo}>
            <Link href="/">
              <img src={light_logo} alt="Website Logo" title='Logo' />
            </Link>
          </div>
          <div className={style.darkLogo}>
            <Link href="/">
              <img src={dark_logo} alt="Website Logo" title='Logo' />
            </Link>
          </div>
          <nav className={style.navigation}>
            <ul className={style.menuList}>
              {
                menu_links.map((item, idx) => {
                  const { label, url, sub_menu = [] } = item;
                  return (
                    <li key={`menu_item_${idx}`} className={style.menuItem}>
                      <Link href={url} className={style.navLink}>
                        {label}
                        {
                          sub_menu && sub_menu.length > 0 && (
                            <i className={getFaIcon("CaretDown")}></i>
                          )
                        }
                      </Link>
                      {
                         sub_menu && sub_menu.length > 0 && (
                          <ul className={style.subMenuList}>
                            {
                              sub_menu.map((subMenu, idx) => {
                                const { label, url } = subMenu;
                                return (
                                  <li key={`sub_menu_item${idx}`} className={style.subMenuItem}>
                                    <Link href={url}>{label}</Link>
                                  </li>
                                )
                              })
                            }
                          </ul>
                         )
                      }
                    </li>
                  )
                })
              }
            </ul>
          </nav>
          <div className={style.contactLinkWrap}>
            <div className={style.icon}>
              <i className={getFaIcon("Phone")}></i>
            </div>
            <div className={style.text}>
              <p>Call Us Today</p>
              <Link href={`tel:${contact_number}`}>
                {contact_number}
              </Link>
            </div>
          </div>
        </div>
      </Center>
    </header>
  )
}

export default Header;