import React, { useEffect } from "react";

export default function useEventListener({ action, event }) {
    useEffect(() => {
        window.addEventListener(event, action);
        return (() => {
            window.removeEventListener(event, action);
        });
    }, []);
}