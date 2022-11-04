import { useEffect, useState } from "react";

export type CSSVarValue = string | number;

/**
 * use Previous Hook: Get access to a state's previous value.
 * @param {T} value
 * @returns An Array containing the value and a Setter.
 */
// eslint-disable-next-line no-unused-vars
export const useCssVar = (name: string, value: CSSVarValue, target?: HTMLElement): [CSSVarValue, (val: CSSVarValue) => void] => {
    const [val, setVal] = useState<CSSVarValue>(value);

    useEffect(() => {
        const trgt = target || document.body;

        if(!value) return;

        if(!name || typeof name !== "string" || !name.startsWith("--"))
            throw new Error("Provide a vaild CSS Variable Name starting with '--'.");

        if(typeof value !== "string" && typeof value !== "number")
            throw new Error(`Value needs to be typeof string or number; value is ${value}, typeof is ${typeof value}`);

        trgt?.style?.setProperty(`${name}`, `${value}`);
    }, [val, name, target]);

    useEffect(() => {
        setVal(value);
    }, [value]);

    return [val, setVal];
};
