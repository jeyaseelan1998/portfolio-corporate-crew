import $ from "jquery-slim";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { LogoLight } from "../../helpers/Images";
import { BackGround, Center, Link } from "../../components";
import MenuItems from './MenuItems';
import getFaIcon from '../../helpers/icons';
import HEADER_DATA from "../../data/header.json";

import style from "./style.module.css";

const Header = ({ winWidth }) => {

  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const ele = $(`#mobileMenuWrapper`);
    const eleHeight = $(`#mobileMenuWrapperInner`);
    if (isOpen) {
      ele.css('height', eleHeight.outerHeight() + 'px');
    } else {
      ele.css('height', '0px');
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false);
  }, [pathname])

  useEffect(() => {
    if (winWidth > 992) {
      setIsOpen(false);
    }
  }, [winWidth])

  const onToggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <header className={style.header}>
      <Center>
        <div className={style.content}>
          <div className={style.lightLogo}>
            <BackGround src={LogoLight} normalImage />
          </div>
          {
            winWidth > 992 && (
              <MenuItems items={HEADER_DATA.menu_links} />
            )
          }
          <Link className={style.callUsTodayButton} href="tel:8001234567">
            <div className={style.icon}>
              <i className={getFaIcon("Phone")}></i>
            </div>
            <div>
              <p className={style.label}>Call Us Today</p>
              <p className={style.number}>800 123 4567</p>
            </div>
          </Link>
          <Link className={style.menu} onClick={onToggleMenu}>
            {
              isOpen && (
                <i className={getFaIcon("Close")}></i>
              )
            }
            {
              !isOpen && (
                <i className={getFaIcon("Bars")}></i>
              )
            }
          </Link>
        </div>
      </Center>
      {
        (winWidth <= 992) && (
          <MenuItems items={HEADER_DATA.menu_links} isMobileView={true} Element={Center} id="mobileMenuWrapper" />
        )
      }
    </header>
  )
}

export default Header;