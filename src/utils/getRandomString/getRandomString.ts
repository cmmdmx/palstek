/**
 * get a random string with a length (default is 5). Warning: Unsafe! Uses math.random().
 * @param {number} length=5
 * @returns {string}
 */
export const getRandomString = (length = 5): string => {
    return Math.random().toString(36).slice(2, 2 + length);
};
