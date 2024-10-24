
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _flattenObject = (obj: Record<string, any>, depth: number, currentDepth: number = 1, parentKey: string = ""): Record<string, any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};

    for(const key in obj)
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = parentKey ? `${parentKey}/${key}` : key;
            const value = obj[key];

            if(typeof value === "object" && !Array.isArray(value) && currentDepth < depth)
                // Recursively flatten if depth is not reached
                Object.assign(result, _flattenObject(value, depth, currentDepth + 1, newKey));
            else
                // Otherwise, assign the value
                result[newKey] = value;
        }


    return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenObject = (object: Record<string, any>, depth: number) => {
    return _flattenObject(object, depth);
};
