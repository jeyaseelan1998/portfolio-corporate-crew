import React from 'react';
import { Link as Anchor } from 'react-router-dom';

import { startsWith } from 'lodash';

const Link = (props) => {
    const { type = "button", href, target = "_self", disabled = false, children, onClick, className, ariaLabel } = props;

    const isTelephone = startsWith(href, "tel:");
    const isMailTo = startsWith(href, "mailto:");

    if (isMailTo || isTelephone) {
        return (
            <a href={href} className={className} aria-label={ariaLabel} target={target} rel='noreferrer noopener'>
                {children}
            </a>
        )
    }

    if (href) {
        return (
            <Anchor to={href} className={className} aria-label={ariaLabel} target={target} rel='noreferrer noopener'>
                {children}
            </Anchor>
        )
    }

    return (
        <button onClick={onClick} type={type} className={className} aria-label={ariaLabel} disabled={disabled}>
            {children}
        </button>
    )
}

export default Link;