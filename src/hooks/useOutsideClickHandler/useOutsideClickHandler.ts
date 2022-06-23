import { useCallback, useEffect, useRef } from "react";

/**
 * hook to handle Outside Click of an element based on event source path
 * @param _onOutsideClick the callback function which will be called when clicking outside, contains the corresponding event
 * @param condition an optional condition. When set to false, the handler will not be registered
 * @param customListeners an optional list of event types ("click", "keypress", ...) to map the listener(s) to
 * @returns an object containing an elementRef which needs to be set to the dom element on which to detect the outside click
 */
export const useOutsideClickHandler = (_onOutsideClick: (e: Event) => void = () => {}, condition?: boolean, customListeners?: (keyof DocumentEventMap)[]) => {
    const elementRef = useRef<Element | null>(null);

    const onOutsideClick = useCallback((e: Event) => {
        return _onOutsideClick(e);
    }, [_onOutsideClick]);

    useEffect(() => {
        const handleClick = (e: Event) => {
            const pth = (e as Event & { path: EventTarget[]}).path || e.composedPath && e.composedPath();

            if(!pth.includes(elementRef.current as EventTarget))
                onOutsideClick(e);
        };

        if(elementRef && elementRef.current && condition) {
            if(customListeners) {
                customListeners.map(lst => document.addEventListener(lst, handleClick));

                return () => customListeners.map(lst => document.removeEventListener(lst, handleClick));
            }

            document.addEventListener("click", handleClick);

            return () => document.removeEventListener("click", handleClick);
        }

        return () => {};
    }, [elementRef, condition, onOutsideClick, customListeners]);

    return [
        elementRef
    ];
};
