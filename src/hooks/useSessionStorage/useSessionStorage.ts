import { useEffect, useState } from "react";
import { getFromSession, setToSession } from "../../utils/sessionStorage";


export const useSessionStorage = <T = string, U = T | null>(key: string, value?: U): [U | undefined, (x: U) => void] => {
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
