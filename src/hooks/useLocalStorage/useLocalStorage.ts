import { useEffect, useState } from "react";


export const getFromLocal = <T = string>(key: string): T | null => {
    const res = localStorage.getItem(`${key}`);

    return res === null ? null : JSON.parse(res);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocal = <T = any>(key: string, value: T) => localStorage.setItem(`${key}`, JSON.stringify(value));


export const useLocalStorage = <T = string, U = T | null>(key: string) => {
    const [state, setState] = useState<U>();

    useEffect(() => {
        if(state !== getFromLocal<U>(key))
            setToLocal(key, state);
    }, [state, key]);

    return [state, setState];
};
