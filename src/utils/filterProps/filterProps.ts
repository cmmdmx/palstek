export type PropsType = Record<string, unknown>;

export const filterProps = <T extends PropsType, K extends Array<keyof T>>(props?: T, ...filter: K): Exclude<T, K> | PropsType => {
    if(!props) return {};
    if(!filter || filter.length === 0) return props;

    return Object.keys(props)
        .filter(key => !filter.includes(key as keyof T))
        .reduce<Partial<T>>((obj, key) => {
            obj[key as keyof T] = props[key as keyof T]; return obj;
        }, {});
};

const defaults = ["history", "location", "match"];

export const autoFilterProps = <T extends PropsType, K extends Array<keyof T>>(props?: T, ...filter: K): Exclude<T, K> | PropsType => {
    if(!props) return {};

    return Object.keys(props)
        .filter(key => !key.startsWith("_") && !filter.includes(key as keyof T) && !defaults.includes(key))
        .reduce<Partial<T>>((obj, key) => {
            obj[key as keyof T] = props[key as keyof T]; return obj;
        }, {});
};
