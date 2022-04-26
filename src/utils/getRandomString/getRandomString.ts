/**
 * get a random string with a length (default is 5). Warning: Unsafe! Uses math.random().
 * @param {number} length=5
 * @returns {string}
 */
export const getRandomString = (length = 5): string => {
    const part = () => (Math.random()).toString(36).slice(2, 10);

    return new Array(Math.ceil(length / 8)).fill("").map(() => part()).join("").slice(0, length);
};
