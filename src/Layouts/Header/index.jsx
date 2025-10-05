import React, { useState } from 'react';

import { BackGround, Center, Link } from "../../components";
import { LogoLight } from "../../helpers/Images";

import style from "./style.module.css";
import getFaIcon from '../../helpers/icons';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <Center>
        <div className={style.content}>
          <div className={style.lightLogo}>
            <BackGround src={LogoLight} normalImage />
          </div>

          <Link className={style.callUsTodayButton} href="tel:8001234567">
            <div className={style.icon}>
              <i className={getFaIcon("Phone")}></i>
            </div>
            <div>
              <p className={style.label}>Call Us Today</p>
              <p className={style.number}>800 123 4567</p>
            </div>
          </Link>

          <Link className={style.menu} onClick={() => setIsOpen(prev => !prev)}>
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
    </header>
  )
}

export default Header;