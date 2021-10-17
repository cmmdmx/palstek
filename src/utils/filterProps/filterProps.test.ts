import { autoFilterProps, filterProps } from "./filterProps";
import test from "ava";

test("simple filter props", t => {
    const props = {
        customProp1: 1,
        title:       "hi",
        href:        "/"
    };

    t.deepEqual(filterProps(props, "customProp1"), { title: "hi", href: "/" });
});

test("simple auto filter props", t => {
    const props = {
        _customProp1: 1,
        title:        "hi",
        href:         "/"
    };

    t.deepEqual(autoFilterProps(props), { title: "hi", href: "/" });
});
