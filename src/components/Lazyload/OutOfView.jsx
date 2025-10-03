import React, { useRef, useEffect } from 'react';

const OutOfView = ({ className, children, onOutCallback, rootMargin = "0px" }) => {
    const ref = useRef(null);

    useEffect(() => {
        let observerRef = null;

        let handlePlay = (entries) => {
            const [entry] = entries;
            onOutCallback(entry, observer, observerRef);
        }

        let observer = new IntersectionObserver(handlePlay, { rootMargin });
        if (ref.current) {
            observerRef = ref.current;
            observer.observe(ref.current);
        }

        return () => {
            if (observerRef) {
                observer.unobserve(observerRef);
                observer.disconnect();
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export default OutOfView;