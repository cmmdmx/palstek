import { useEffect, useState } from "react";
import { getFromLocal, setToLocal } from "../../utils/localStorage";


export const useLocalStorage = <T = string, U = T | null>(key: string, value?: U): [U | undefined, (x: U) => void] => {
    // eslint-disable-next-line no-undefined
    const [state, setState] = useState<U | undefined>(value !== undefined ? value : getFromLocal<U>(key) as U);

    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if(e.key !== key) return 0;

            const fromLocal = getFromLocal<U>(key);

            // eslint-disable-next-line no-undefined
            if(fromLocal !== undefined) return setState(fromLocal as U);

            return 0;
        };

        window.addEventListener("storage", handler);

        return () => window.removeEventListener("storage", handler);
    }, []);

    const handleSet = (val: U) => {
        if(val !== state)
            setToLocal(key, val);
    };

    return [state, handleSet];
};
