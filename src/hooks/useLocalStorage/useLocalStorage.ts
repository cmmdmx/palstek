import { useEffect, useState } from "react";


export const getFromLocal = <T = string>(key: string): T | null => {
    const res = localStorage.getItem(`${key}`);

    return res === null ? null : JSON.parse(res);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocal = <T = any>(key: string, value: T) => localStorage.setItem(`${key}`, JSON.stringify(value));


export const useLocalStorage = <T = string, U = T | null>(key: string, value?: U) => {
    const [state, setState] = useState<U | undefined>(value);

    useEffect(() => {
        if(state !== getFromLocal<U>(key))
            setToLocal(key, state);
    }, [state, key]);

    useEffect(() => {
        const initValue = getFromLocal<U>(key);

        if(initValue)
            setState(initValue);
    }, []);

    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if(e.key !== key || e.newValue === state) return 0;

            const fromLocal = getFromLocal<U>(key);

            if(fromLocal && fromLocal !== state) return setState(fromLocal);

            return 0;
        };

        window.addEventListener("storage", handler);

        return () => window.removeEventListener("storage", handler);
    }, []);

    return [state, setState];
};
