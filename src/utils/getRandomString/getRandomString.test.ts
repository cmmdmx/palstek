import test from "ava";
import { getRandomString } from ".";

test("test one string default lenght", t => {
    const strA = getRandomString();

    t.is(typeof strA, "string");

    t.is(strA.length, 5);
});

test("test one string custom lenght", t => {
    const strA = getRandomString(7);

    t.is(typeof strA, "string");

    t.is(strA.length, 7);
});

test("test two strings not the same", t => {
    const strA = getRandomString();
    const strB = getRandomString();

    t.not(strA, strB);
});
