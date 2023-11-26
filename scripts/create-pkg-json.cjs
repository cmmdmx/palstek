// eslint-disable-next-line
const original = require("../package.json");
// eslint-disable-next-line
const fs = require("fs");

const defaultPkgJsonWhitelist = [
    "name",
    "version",
    "description",
    "files",
    "main",
    "module",
    "typings",
    "types",
    "exports",
    "repository",
    "keywords",
    "author",
    "license",
    "bugs",
    "homepage",
    "browserlist",
    "engines",
    "peerDependencies",
    "dependencies"
];

// eslint-disable-next-line no-unused-vars
const copyPackageJson = (pkg, rewritePaths, whitelist = defaultPkgJsonWhitelist) => {
    const resolveValue = part => {
        if(typeof part === "string") return rewritePaths(part);

        if(Array.isArray(part)) return part.map(x => resolveValue(x));

        if(typeof part === "object") return Object.fromEntries(Object.entries(part).map(entry => ([rewritePaths(entry[0]), resolveValue(entry[1])])));

        return part;
    };

    return Object.assign(
        {},
        Object.fromEntries(
            Object.keys(pkg)
                .filter(x => whitelist.includes(x))
                .map(key => {
                    return [key, resolveValue(pkg[key])];
                })));
};

try {
    const res = copyPackageJson(original, path => `${path}`.replace("dist/", ""));

    // eslint-disable-next-line
    fs.writeFileSync("./dist/package.json", JSON.stringify(res, null, 2));

    console.log("Successfully created dist/package.json");
} catch(e) {
    console.error("Error creating dist/package.json", e);
}
