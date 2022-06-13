import { useEffect, useState } from "react";

export type CSSVarValue = string | number;

/**
 * use Previous Hook: Get access to a state's previous value.
 * @param {T} value
 * @returns {T | undefined}
 */
// eslint-disable-next-line no-unused-vars
export const useCssVar = (name: string, value: CSSVarValue, target?: HTMLElement): (val: CSSVarValue) => void => {
    const [val, setVal] = useState<CSSVarValue>(value);

    useEffect(() => {
        const trgt = target || document.body;

        if(!name || typeof name !== "string" || !name.startsWith("--"))
            throw new Error("Provide a vaild CSS Variable Name starting with '--'.");


        trgt.style.setProperty(`${name}`, `${value}`);
    }, [val, name, target]);

    const updateValue = (_val: CSSVarValue) => {
        setVal(_val);
    };

    return updateValue;
};
