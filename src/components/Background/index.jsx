import React, { useState } from 'react';
import { isEmpty } from 'lodash';

import Spinner from '../Spinner';
import OutOfView from '../Lazyload/OutOfView';

import style from './style.module.css';

const BrokenImage = ({ className, icon = "fa-image", sizer }) => {
    return (
        <>
            {
                sizer === true && (
                    <div className={style.sizer} />
                )
            }
            <div className={style.bsz}>
                <div className={`${style.bgImage}${className ? ` ${className}` : ""}`}>
                    <div className={style.fa}>
                        <i className={`fa-solid ${icon}`}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

const LazyImage = (props) => {
    const [loaded, setLoaded] = useState(0);
    const { width = 0, height = 0 } = props;

    const onOutHandler = (entry, observer) => {
        if (entry.isIntersecting && loaded === 0) {
            //Create an image 
            const img = new Image();
            img.src = props?.src;
            //Check for load status
            if (img.complete || img.readystate === 4) {
                setLoaded(1);
            }
            else {
                img.onload = () => {
                    setLoaded(1);
                }
                img.onerror = () => {
                    setLoaded(2);
                    console.log(`Error in loading img: ${props?.src}`);
                }
            }
            observer.disconnect();
        }
    }

    return (
        <>
            {
                (props?.sizer || false) === true && (
                    <div className={style.sizer} style={{ paddingTop: `${height > 0 && width > 0 ? height * 100 / width : 50}%` }}></div>
                )
            }
            <OutOfView className={style.bsz} onOutCallback={onOutHandler}>
                <div className={`${style.bgImage}${((props?.className || "") !== "") ? " " + props?.className : ""}${loaded === 0 ? " " + style.loading : ""}`} style={{ backgroundImage: loaded === 1 ? `url("${encodeURI(props?.src)}")` : "none" }}>
                    {
                        loaded === 1 && (
                            <img alt={props?.alt || ""} title={props?.title || ""} src={props?.src} />
                        )
                    }
                    {
                        loaded === 0 && (
                            <div className={style.spinner}>
                                <Spinner color="#fff" />
                            </div>
                        )
                    }
                    {
                        loaded === 2 && (
                            <div className={style.fa}>
                                <i className={`fa-regular fa-image-slash`}></i>
                            </div>
                        )
                    }
                </div>
            </OutOfView>
        </>
    )
}

export default function Media(props) {
    const { src, className = "", lazy = true, fallback = true, retainAspectRatio = false, normalImage = false } = props;

    //if src is empty then display a broken image
    if (isEmpty(src)) {
        if (fallback === true) {
            //Show a broken image for fallback if set to true
            return (
                <BrokenImage sizer={retainAspectRatio} />
            )
        }
        return null;
    }

    let media_url = src;

    //If lazy load is disabled, then display the image directly
    if (((lazy === false && retainAspectRatio === false) || normalImage === true)) {
        return (
            <img alt={props?.alt || ""} title={props?.title || ""} src={media_url} className={props?.className} />
        )
    }

    //Lazy load the image
    return (
        <LazyImage {...props} {...src} src={media_url} className={className !== "" ? className : ""} sizer={retainAspectRatio} />
    )
}