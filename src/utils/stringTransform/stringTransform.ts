const transformerRegex = /[-_\s]/g;

export const stringTransform = {

    /**
     * toKebab: transform any string to kebab-case.
     * @example
     * // returns "some-string"
     * stringTransform.toCamelCase("someString");
     * @param {string} str
     * @returns {string} string in kebab-case
     */
    toKebab: (str: string) => str ? str.replace(/[A-ZÀ-Ü]+(?![a-zà-ÿ])|[A-ZÀ-Ü]/g, (_str, ofs) => (ofs ? "-" : "") + _str.toLowerCase()) : "",

    /**
     * toCamelCase: transform any string to camelCase. Replaces '-', '_' and ' ' by default.
     * @example
     * // returns "someString"
     * stringTransform.toCamelCase("some-string");
     * @param {string} str
     * @param {RegExp} [regex]
     * @returns {string} string in camelCase
     */
    toCamelCase: (str: string, regex = transformerRegex) => str ? str.split(regex).map((part, i) => i === 0 ?
        `${part[0].toLowerCase()}${part.slice(1)}` :
        `${part[0].toUpperCase()}${part.slice(1)}`).join("") : "",

    /**
     * toPascalCase: transform any string to PascalCase. Replaces '-', '_' and ' ' by default.
     * @example
     * // returns "SomeString"
     * stringTransform.toCamelCase("some string");
     * @param {string} str
     * @param {RegExp} [regex]
     * @returns {string} string in PascalCase
     */
    toPascalCase: (str: string, regex = transformerRegex) => str ? str.split(regex).map(part => `${part[0].toUpperCase()}${part.slice(1)}`).join("") : ""
};
