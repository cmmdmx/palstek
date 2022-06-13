const { exec } = require("child_process");
const readline = require("readline");

const allowed = [
    "major", "minor", "patch", "premajor", "preminor", "prepatch", "prerelease"
]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Type of new version: ${allowed.join(" | ")}\nversion: `, (res) => {
    if (allowed.includes(res)) {
        exec(`npm version ${res}`, (err, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
        });
        rl.close();
    }
    else {
        throw Error("Did not match any of the allowed versions");
    }
    rl.close();
})