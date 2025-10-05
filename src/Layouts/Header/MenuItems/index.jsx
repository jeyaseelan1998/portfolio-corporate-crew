import { get } from 'lodash';
import React, { useState } from 'react';

import { Link } from '../../../components';

import style from "./style.module.css";
import getFaIcon from '../../../helpers/icons';
import { useLocation } from 'react-router-dom';

const MenuItems = ({ items = [], isMobileView = false }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const { pathname } = useLocation();

    const onMouseHover = (idx) => {
        if (!isMobileView) {
            setActiveMenu(idx);
        }
    }

    const onMouseClick = (idx) => {
        if (isMobileView) {
            setActiveMenu(idx);
        }
    }

    return (
        <nav className={style.menuItemsWrapper}>
            {
                items.length > 0 && (
                    <ul className={style.menuList}>
                        {
                            items.map((item, idx) => {
                                const subMenuLinks = get(item, "sub_menu_links", []);

                                return (
                                    <li
                                        role='button'
                                        key={`menu_item_${idx}`}
                                        className={`${style.menuItem}${idx === activeMenu ? ` ${style.active}` : ''}`}
                                        onMouseEnter={() => onMouseHover(idx)}
                                        onMouseLeave={() => onMouseHover(false)}
                                        onClick={() => onMouseClick(idx)}
                                    >
                                        <Link href={item.url} className={`${style.menuLink}${(pathname === item.url) || (pathname.startsWith(`/${item.label.toLowerCase()}/`)) ? ` ${style.inView}` : ''}`}>
                                            <span>
                                                {item.label}
                                            </span>
                                            {
                                                subMenuLinks.length > 0 && (
                                                    <span className={style.icon}>
                                                        <i className={getFaIcon("CaretDown")}></i>
                                                    </span>
                                                )
                                            }
                                        </Link>

                                        {
                                            subMenuLinks.length > 0 && (
                                                <ul className={style.subMenuList}>
                                                    {
                                                        subMenuLinks.map((subMenu, idx) => {

                                                            return (
                                                                <li key={`menu_item_${idx}`} className={style.subMenuItem}>
                                                                    <Link className={`${style.subMenuLink}${pathname === subMenu.url ? ` ${style.inView}` : ''}`} href={subMenu.url}>
                                                                        {subMenu.label}
                                                                    </Link>
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
                )
            }
        </nav>
    )
}

export default MenuItems;