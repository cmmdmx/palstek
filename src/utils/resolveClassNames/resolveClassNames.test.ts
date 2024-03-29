import test from "ava";
import { resolveClassNames } from ".";

test("1 class name", t => {
    t.is(resolveClassNames("hi"), "hi");
});

test("2 class names", t => {
    t.is(resolveClassNames("hi", "ho"), "hi ho");
});

test("3 class names", t => {
    t.is(resolveClassNames("hi", "ho", "hu"), "hi ho hu");
});

test("nested class names", t => {
    t.is(resolveClassNames("hi", ["ho", "hu"]), "hi ho hu");
});

test("conditional class names", t => {
    t.is(resolveClassNames("hi", 1 > 2 && "ho"), "hi");
});

test("no class names", t => {
    t.is(resolveClassNames(), "");
});

test("undefined", t => {
    // eslint-disable-next-line no-undefined
    t.is(resolveClassNames(undefined, "hi"), "hi");
});

test("number", t => {
    t.is(resolveClassNames(1 as unknown as string, "hi"), "hi");
});

test("unnecessary whitespaces", t => {
    t.is(resolveClassNames(1 as unknown as string, "hi   asdf  gu  "), "hi asdf gu");
});
