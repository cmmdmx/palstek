import { useEffect, useState } from "react";
import { getFromLocal, setToLocal } from "../../utils/localStorage";


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
