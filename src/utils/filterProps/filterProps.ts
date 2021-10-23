
export const filterProps = <T, K extends Array<keyof T>>(props?: T, ...filter: K): Exclude<T, K> | Partial<T> => {
    if(!props) return {};
    if(!filter || filter.length === 0) return props;

    return Object.keys(props)
        .filter(key => !filter.includes(key as keyof T))
        .reduce<Partial<T>>((obj, key) => {
            obj[key as keyof T] = props[key as keyof T]; return obj;
        }, {});
};

const defaults = ["history", "location", "match"];

export const autoFilterProps = <T, K extends Array<keyof T>>(props?: T, ...filter: K): Exclude<T, K> | Partial<T> => {
    if(!props) return {};

    return Object.keys(props)
        .filter(key => !key.startsWith("_") && !filter.includes(key as keyof T) && !defaults.includes(key))
        .reduce<Partial<T>>((obj, key) => {
            obj[key as keyof T] = props[key as keyof T]; return obj;
        }, {});
};
