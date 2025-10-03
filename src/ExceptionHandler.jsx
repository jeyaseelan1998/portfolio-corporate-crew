import React from "react";
import api from './api';
import DeviceDetector from 'device-detector-js';
import { ErrorBoundary } from 'react-error-boundary';

import ExceptionScreen from "./pages/Shared/ExceptionScreen";

export default function ExceptionHandler({ children }) {

    const deviceDetector = new DeviceDetector();
    const deviceDetails = deviceDetector.parse(navigator.userAgent);

    const handleError = (error) => {
        const errorData = {
            message: error.message,
            stacktrace: error.stack,
            device_details: JSON.stringify(deviceDetails),
            url: window.location.pathname,
        }
        api.post('/errors', errorData)
    };

    return (
        <ErrorBoundary
            FallbackComponent={({ resetErrorBoundary }) => (
                <ExceptionScreen onClick={resetErrorBoundary} />
            )}
            onError={handleError}
        >
            {children}
        </ErrorBoundary>
    )
}