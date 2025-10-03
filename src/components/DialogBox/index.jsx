import React, { useEffect, useRef, useState } from 'react';

import getFaIcon from '../../helpers/icons';
import Link from '../Link';
import ModalBase from './ModalBase';

import style from './style.module.css';

export default function DialogBox(props) {
    const { title = "", fullscreen = false, style: cssStyle = {}, center = true, render = false, buttons = false, hasCloseIcon = true, modalClassName = "", className = "", contentClassName = false, headerClass = false, children, buttonClassName = "", onClose = () => { } } = props;
    const [openClassName, setOpenClassName] = useState("");
    const [closeClassName, setCloseClassName] = useState("");
    const closeCallback = useRef(() => { });
    let timer = 0;

    useEffect(() => {
        // eslint-disable-next-line
        timer = setTimeout(() => {
            setOpenClassName(" " + style.dialogOpen);
        }, 50)

        return () => {
            clearTimeout(timer);
        }
    }, [])

    useEffect(() => {
        if (closeClassName === " " + style.dialogRemove) {
            // eslint-disable-next-line
            timer = setTimeout(() => {
                onClose();
                if (typeof closeCallback.current === "function") {
                    closeCallback.current();
                }
            }, 625);
        }
        return () => {
            clearTimeout(timer);
        }

    }, [closeClassName])

    const onCloseHandler = (callbackFunction = () => { }) => {
        closeCallback.current = callbackFunction;
        setCloseClassName(" " + style.dialogRemove);
    }

    if (fullscreen === true) {
        return (
            <ModalBase>
                <div className={`${style.dialogBoxOverlay} ${style.dialogFullscreen} ${center ? style.dialogCenter : style.dialogTop}${modalClassName ? " " + (style[modalClassName] || modalClassName) : ""}${openClassName}${closeClassName}`} style={cssStyle}>
                    <div className={`${style.dialogBox}`}>
                        {render && render({ closeDialog: onCloseHandler, style })}
                        {children}
                    </div>
                </div>
            </ModalBase>
        )
    }

    return (
        <ModalBase>
            <div className={`${style.commonDialogBox} ${style.dialogBoxOverlay} ${center ? style.dialogCenter : style.dialogTop}${modalClassName ? " " + (style[modalClassName] || modalClassName) : ""}${openClassName}${closeClassName}`} style={cssStyle}>
                <div className={`${style.dialogBox}`}>
                    <div className={`${style.dialogPosition}${className ? " " + className : ""}`}>
                        <div className={`${style.dialogHeader}${headerClass ? ` ${headerClass}` : ''}`}>
                            <h5 className={style.dialogTitle}>{title}</h5>
                            {
                                hasCloseIcon === true && (
                                    <Link className={`${style.dialogClose} ${style.backButton}`} onClick={() => onCloseHandler()}><i className={getFaIcon("Close")}></i></Link>
                                )
                            }
                        </div>
                        <div className={`${style.dialogContent}${contentClassName ? ` ${contentClassName}` : ''}`}>
                            {render && render({ closeDialog: onCloseHandler, style })}
                            {children}
                        </div>
                        {buttons && <div className={`${style.dialogButtons}${style[buttonClassName] ? ' ' + style[buttonClassName] : ''}`}>{buttons(onCloseHandler)}</div>}
                    </div>
                </div>
            </div>
        </ModalBase>
    )
}