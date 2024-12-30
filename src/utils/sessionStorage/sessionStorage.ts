
export const getFromSession = <T = string>(key: string): T | null => {
    const _sesStor = sessionStorage || window.sessionStorage;

    const res = _sesStor.getItem(`${key}`);

    if(res === null) return null;

    try {
        return JSON.parse(res);
    } catch{
        return null;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToSession = <T = any>(key: string, value: T) => {
    const _sesStor = sessionStorage || window.sessionStorage;

    try {
        // eslint-disable-next-line no-undefined
        if(key && value !== undefined)
            return _sesStor.setItem(`${key}`, JSON.stringify(value));

        if(key) return _sesStor.removeItem(key);
    } catch{
        return new Error(`Problem using 'setToLocal' with params ${key}, ${value}.`);
    }

    return null;
};

