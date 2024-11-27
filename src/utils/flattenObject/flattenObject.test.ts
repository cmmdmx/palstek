import test from "ava";
import { flattenObject } from "./";

const input = { d1: { d2: { d3: 1 } } };
const output = { "d1/d2/d3": 1 };
const mixed = { "d1/d2": { d3: 1 } };

test("simple flatten object", t => {
    t.deepEqual(flattenObject(input, 3), output);
    t.deepEqual(flattenObject(input, 2), mixed);
});

const inp2 = { d1: { d2: 2, d3: 3 } };
const out2 = { "d1/d2": 2, "d1/d3": 3 };

test("branched flatten object", t => {
    t.deepEqual(flattenObject(inp2, 2), out2);
});
