import React from 'react';

import style from "./style.module.css";

const Section = ({ children, hasVerticalLine = false}) => {
    return (
        <section className={style.section}>
            {children}
            {
                hasVerticalLine === true && (
                    <div className={style.vrLine} />
                )
            }
        </section>
    )
}

export default Section;