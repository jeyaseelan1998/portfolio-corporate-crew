import React from 'react';

import style from "./style.module.css";

const Text = ({ size = '16', tag = 'p', children, className, fw }) => {
    const Tag = tag;
    return (
        <Tag className={`${style.text}${style[`font${size}`] ? ` ${style[`font${size}`]}` : ''}${style[className] ? ` ${style[className]}` : ''}${style['fw'+fw] ? ` ${style['fw'+fw]}` : ''}`}>{children}</Tag>
    )
}

export default Text;