
export const getFromLocal = <T = string>(key: string): T | null => {
    const _locStor = localStorage || window.localStorage;

    const res = _locStor.getItem(`${key}`);

    if(res === null) return null;

    try {
        return JSON.parse(res);
    } catch{
        return null;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocal = <T = any>(key: string, value: T) => {
    const _locStor = localStorage || window.localStorage;

    try {
        // eslint-disable-next-line no-undefined
        if(key && value !== undefined) {
            const prev = _locStor.getItem(key);

            _locStor.setItem(`${key}`, JSON.stringify(value));

            return dispatchEvent(new StorageEvent("storage", {
                key,
                oldValue: prev,
                newValue: value as string | null
            }));
        }

        if(key) return _locStor.removeItem(key);
    } catch{
        return new Error(`Problem using 'setToLocal' with params ${key}, ${value}.`);
    }

    return null;
};

