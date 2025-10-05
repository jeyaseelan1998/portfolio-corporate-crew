import $ from "jquery-slim";
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from "../Header";

const GuestLayout = () => {
    const [dimensions, setDimensions] = useState({});

    useEffect(() => {
        function updateDimensions() {
            setDimensions({
                winWidth: $(window).width(),
                winHeight: $(window).height() - $(`header`).outerHeight(),
            });
        }
        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, []);

    return (
        <>
            <Header winWidth={dimensions.winWidth} />
            <Outlet context={{ winHeight: dimensions.winHeight, winWidth: dimensions.winWidth }} />
        </>
    )
}

export default GuestLayout;