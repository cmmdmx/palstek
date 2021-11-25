const resolveClassNames = (...classNameArgs: Array<string | boolean | undefined | string[]>): string => {
    return [...classNameArgs]
      .flat(3)
      .filter(name => typeof name === "string" && name !== "undefined")
      .join(" ");
};

export { resolveClassNames };
