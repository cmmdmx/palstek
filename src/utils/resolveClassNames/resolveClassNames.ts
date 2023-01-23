
/**
 * filter an js object of props by listing keys. T is the Object, K is a subset of keys of Object T.
 * @param {...(string|boolean|undefined|string[])} args
 * @returns {string}
 */
const resolveClassNames = (...classNameArgs: Array<string | boolean | undefined | string[]>): string => {
    return [...classNameArgs]
      .flat(3)
      .filter(name => typeof name === "string" && name !== "undefined")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
};

export { resolveClassNames };
