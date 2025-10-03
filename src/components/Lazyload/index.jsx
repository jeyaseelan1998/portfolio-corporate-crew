import React, { useState } from 'react';
import OutOfView from "./OutOfView";
import style from "./style.module.css";

const LazyLoad = ({ className = "", children, rootMargin = "-10%" }) => {
    const [cssClass, setCssClass] = useState("");

    const onOutHandler = (entry, observer, observerRef) => {
        if (entry.isIntersecting) {
            setCssClass(style.enter);
            if (observerRef) {
                observer.disconnect();
            }
        }
    }

    return (
        <OutOfView className={`${className ? className + " " : ""}${style.lazyLoad} ${cssClass ? " " + cssClass : ""}`} rootMargin={rootMargin} onOutCallback={onOutHandler}>{children}</OutOfView>
    )
}

export default LazyLoad;