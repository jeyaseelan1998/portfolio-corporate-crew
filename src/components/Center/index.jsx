import React from 'react';

import style from "./style.module.css";

const Center = ({ children }) => {
    return (
        <div className={style.center}>
            {children}
        </div>
    )
}

export default Center;