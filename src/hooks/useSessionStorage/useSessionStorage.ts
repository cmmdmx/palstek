import { useEffect, useState } from "react";


export const getFromSession = <T = string>(key: string): T | null => {
    const res = sessionStorage.getItem(`${key}`);

    return res === null ? null : JSON.parse(res);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToSession = <T = any>(key: string, value: T) => sessionStorage.setItem(`${key}`, JSON.stringify(value));


export const useSessionStorage = <T = string, U = T | null>(key: string, value?: U) => {
    const [state, setState] = useState<U | undefined>(value);

    useEffect(() => {
        if(state !== getFromSession<U>(key))
            setToSession(key, state);
    }, [state, key]);

    useEffect(() => {
        const initValue = getFromSession<U>(key);

        if(initValue)
            setState(initValue);
    }, []);

    return [state, setState];
};
