import $ from "jquery-slim";
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from '../../../components';
import getFaIcon from '../../../helpers/icons';

import style from "./style.module.css";

const MenuItems = ({ items = [], isMobileView = false, id, Element = React.Fragment }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const { pathname } = useLocation();

    const onMouseHover = (idx) => {
        if (isMobileView === false) {
            setActiveMenu(idx);
        }
    }

    const onMouseClick = (idx) => {
        if (isMobileView === true) {
            setActiveMenu(prev => prev === idx ? false : idx);
            const wrapper = $(`#subMenuWrapper${idx}`);
            if (wrapper.outerHeight() > 0) {
                wrapper.css('height', "0px");
            } else {
                const contentHeight = $(`#subMenuList${idx}`).outerHeight() + "px";
                wrapper.css('height', contentHeight);
            }
        }
    }

    const Tag = Element;

    return (
        <nav className={style.menuItemsWrapper} id={id}>
            <div id={id + "Inner"}>
                <Tag>
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
                                                <Link href={item.url} className={`${style.menuLink}${(pathname === item.url) || (pathname.startsWith(`/${(item.label || "").toLowerCase()}/`)) ? ` ${style.inView}` : ''}`}>
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
                                                        <div className={style.subMenuListWrapper} id={`subMenuWrapper${idx}`}>
                                                            <ul className={style.subMenuList} id={`subMenuList${idx}`}>
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
                                                        </div>
                                                    )
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                </Tag>
            </div>
        </nav>
    )
}

export default MenuItems;