import { useEffect, useRef } from "react";

/**
 * use Previous Hook: Get access to a state's previous value.
 * @param {T} value
 * @returns {T | undefined}
 */
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
