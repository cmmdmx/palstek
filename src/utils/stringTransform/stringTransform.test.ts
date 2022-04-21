import test from "ava";
import { stringTransform } from "./stringTransform";

test("Kebabize default", t => {
    t.is(stringTransform.toKebab("someString"), "some-string");
});

test("Kebabize already kebabized", t => {
    t.is(stringTransform.toKebab("some-string"), "some-string");
});

test("Kebabize short string", t => {
    t.is(stringTransform.toKebab("s"), "s");
});

test("Kebabize upper short string", t => {
    t.is(stringTransform.toKebab("S"), "s");
});

test("Kebabize special characters", t => {
    t.is(stringTransform.toKebab("änyÜströng"), "äny-üströng");
});

// camelCase

test("camelCase default", t => {
    t.is(stringTransform.toCamelCase("some-string"), "someString");
});

test("camelCase already camelcased", t => {
    t.is(stringTransform.toCamelCase("someString"), "someString");
});

test("camelCase short string", t => {
    t.is(stringTransform.toCamelCase("s"), "s");
});

test("camelCase upper short string", t => {
    t.is(stringTransform.toCamelCase("S"), "s");
});

test("camelCase from PascalCase", t => {
    t.is(stringTransform.toCamelCase("PascalCase"), "pascalCase");
});

test("camelCase special Characters", t => {
    t.is(stringTransform.toCamelCase("some-stränge-Üstring"), "someSträngeÜstring");
});

test("camelCase from space", t => {
    t.is(stringTransform.toCamelCase("string with space"), "stringWithSpace");
});

// PascalCase

test("PascalCase default", t => {
    t.is(stringTransform.toPascalCase("some-string"), "SomeString");
});

test("PascalCase already PascalCased", t => {
    t.is(stringTransform.toPascalCase("SomeString"), "SomeString");
});

test("PascalCase short string", t => {
    t.is(stringTransform.toPascalCase("s"), "S");
});

test("PascalCase upper short string", t => {
    t.is(stringTransform.toPascalCase("S"), "S");
});

test("PascalCase from camelCase", t => {
    t.is(stringTransform.toPascalCase("pascalCase"), "PascalCase");
});

test("PascalCase special Characters", t => {
    t.is(stringTransform.toPascalCase("some-stränge-Üstring"), "SomeSträngeÜstring");
});

test("PascalCase from space", t => {
    t.is(stringTransform.toPascalCase("string with space"), "StringWithSpace");
});

test("PascalCase from underscore", t => {
    t.is(stringTransform.toPascalCase("string_with_space"), "StringWithSpace");
});
