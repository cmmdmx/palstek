const resolveClassNames = (...classNameArgs: Array<string | boolean | undefined | string[]>): string => {
    const classNames = [...classNameArgs].filter(part => part !== false);

    return classNames
      .flat(2)
      .filter(name => typeof name === "string")
      .join(" ");
};

export { resolveClassNames };
