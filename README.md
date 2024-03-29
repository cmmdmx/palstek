
```
______     _     _       _      
| ___ \   | |   | |     | |     
| |_/ /_ _| |___| |_ ___| | __  
|  __/ _` | / __| __/ _ \ |/ /  
| | | (_| | \__ \ ||  __/   < _ 
\_|  \__,_|_|___/\__\___|_|\_(_)
                                
                              
>> Palstek - a bunch of useful extensions for react projects.
```



# Overview

- [Overview](#overview)
- [Intro](#intro)
  - [Quick Start](#quick-start)
- [Reference](#reference)
  - [utils](#utils)
    - [resolveClassNames](#resolveclassnames)
    - [getRandomString](#getrandomstring)
    - [filterProps](#filterprops)
    - [autoFilterProps](#autofilterprops)
    - [stringTransform](#stringtransform)
    - [setToSession](#settosession)
    - [getFromSession](#getfromsession)
    - [setToLocal](#settolocal)
    - [getFromLocal](#getfromlocal)
  - [static](#static)
    - [reset.css](#resetcss)
  - [hooks](#hooks)
    - [usePrevious](#useprevious)
    - [useCssVar](#usecssvar)
    - [useOutsideClickHandler](#useoutsideclickhandler)
    - [useLocalStorage](#uselocalstorage)
    - [useSessionStorage](#usesessionstorage)
- [Future Plans](#future-plans)
- [Contribution](#contribution)
- [Issues \& Help](#issues--help)
    - [`(...) palstek is not a module (ts2306)`](#-palstek-is-not-a-module-ts2306)
- [Credits](#credits)

---

# Intro

Why "palstek"? - Because this is one of the most used knots on a sailboat. Just as useful, selected functions should be provided here. Especially designed as extension to functional react projects, react libraries and design systems.

> It's designed as zero-dependency; no other packages do come with `palstek`. If you want to use all features (especially the hooks), you need to have `react` package as peerDependency installed.

## Quick Start

1. Install the package with `npm i palstek` into your project
2. Use the functions. They support typescript.

# Reference

## utils

Utils contains a random collection of useful functions - often designed to bring in an own pattern into your react project.

### resolveClassNames

You want to build reusable (libary-) components in react and are annoyed by merging your classnames with props.className(s)?
This function is here to help. Use it in your components like:

```jsx
    return <div className={resolveClassNames("my-component", props.className, someCondition && "modifier-class")}>{/*...*/}</div>
```

It will automatically filter out undefineds & falsy values. All valid strings are joined together to get valid multi-classNames. Also works with string arrays and css modules.


### getRandomString

Get a string of random letters and numbers with a length, default is 5.

```jsx
    const randomString = getRandomString(7); // will for example create '3udzdaf'
```


### filterProps

This function is perfect for building atomic library components, where the vanilla props API should be preserved.
Example:

```tsx

type MyButtonProps = { appearance: "CTA" | "default" } & HTMLProps<HTMLButtonElement>;

export MyButton = (props: MyButtonProps) => (
    return <button {...filterProps(props, "appearance", "children")}>
        { props.appearance === "CTA" ? <b>{props.children}</b> : props.children }
    </button>
)

```

For a consumer of your library this is now still a full-featured HTML Button with access to it's complete props API. You only care about your feature additions.

### autoFilterProps

This function works similar to the `filterProps` function but with one addition: To avoid big lists of custom props, you may want to use this pattern: all custom props begin with an underscore.
Example: 

```tsx

type MyButtonProps = { _appearance: "CTA" | "default" } & HTMLProps<HTMLButtonElement>;

export MyButton = (props: MyButtonProps) => (
    return <button {...filterProps(props, "children")}>
        { props._appearance === "CTA" ? <b>{props.children}</b> : props.children }
    </button>
)

```

The `autoFilterProps` will automatically remove all members of the props object starting with an underscore. It also filters out following standard props (coming for example from react router): 

- history
- location
- match


### stringTransform

This function collection is useful to transform strings in several common targets, such as to "kebab-case", "camelCase" and "PascalCase".
Example: 

```tsx

const myString = "some-kebab-string";

const newString = stringTransform.toCamelCase(myString); // newString will be "someKebabString"

```

All functions support special characters (from languages like German or French).

Both functions `toCamelCase` and `toPascalCase` replace the characters `-`, `_`, and whitespace by default, but you can pass your own Regexp as optional parameter to modify the function to also replace a `.` or a `,` for example.

### setToSession

Lightweight wrapper for `sessionStorage.setItem()`, will perform a `JSON.stringify()` for the value.
Might get upgraded with custom event in future.

### getFromSession

Lightweight wrapper for `sessionStorage.getItem()`, will perform a `JSON.parse()` for the value.

### setToLocal

Lightweight wrapper for `localStorage.setItem()`, will perform a `JSON.stringify()` for the value.
Might get upgraded with custom event in future.

### getFromLocal

Lightweight wrapper for `localStorage.getItem()`, will perform a `JSON.parse()` for the value.

---

## static

### reset.css

This lightweight reset.css can be imported at first in every project to do some helpful normalizings to your project's styling. 

## hooks

### usePrevious

Get access to a state's previous value. This can be helpful to implement a simple undo or to compare old and new values.

Example:

```tsx
// inside a React Component

const [count, setCount] = useState(0); 
const previousCount = usePrevious(count); // will always be the previous value, like a "history - 1"

```

### useCssVar

Provide local values insider your component's code to CSS as CSS Variable (needs browser support).

Example:

```tsx
const MyComponent = () => {
  const [val, setVal] = useCssVar("--my-font-size", "2rem");

  return (
    <div style={{ fontSize: "var(--my-font-size)" }}>
        The value: {val}
        <button onClick={() => setVal(`${parseInt(val) + 1}rem`)}>increase</button>
    </div>
  );
};
```

Parameters:
1. Variable name (has to start with '--')
2. Variable value
3. optional, an HtmlElement Reference on which to set the variable (default document.body)

Returns (similar to useState):
1. The value
2. Setter for the value

### useOutsideClickHandler 

A useful hook to manage "outside" clicks of DOM Elements. Based on React Ref and Event.composedPath.
This pattern is quite solid and efficient, but does not work as soon as the DOM hierarchy does not represent the visual hierarchy (because of `position: absolute` of sub-elements or similar).

Example:

```tsx
const MyComponent = () => {
  const outsideClickHandler = () => {
    console.log("outside");
  }

  const [elementRef] = useOutsideClickHandler(outsideClickHandler);

  return (
    <div ref={elementRef}>
      Dialog / Modal / Popup / ...
    </div>
  );
};
```

Parameters:
1. Your click handler. Will get triggered once an outside click is detected.
2. A condition (boolean). If false, the listener(s) won't get registered and/or unregistered. Default true.
3. An optional list of event types, in case you want to listen to additional / other events than "click".

Returns:
1. elementRef: The ref of the element which has to be inside the `composedPath` of the click(?) event. It's just a passthrough of React.useRef and works identical. Default's `null`.

### useLocalStorage

A simple helper hook to access localStorage. Works like a useState hook. Listens to "storage" Event on window object, in case another tab/window accesses the same storage area (based on URL/domain).

```tsx

const initValue = 15;

const [value, setValue] = useLocalStorage("myKey", initValue);

// will store '15' at key 'myKey' in localStorage

```

### useSessionStorage

A simple helper hook to access sessionStorage. Works like a useState hook.

```tsx

const initValue = 15;

const [value, setValue] = useSessionStorage("myKey", initValue);

// will store '15' at key 'myKey' in sessionStorage

```

# Future Plans

- Include the possibility to only install single functions instead of the whole package, like `npm i palstek/resolveClassNames`.

# Contribution

If you want to contribute, feel free to do so. Just create your own branch and submit a PR with the changes.

# Issues & Help

### `(...) palstek is not a module (ts2306)`

There are inconsistencies when importing typings from node modules. This error should not occur if you use `moduleResolution: node` inside your tsconfig.

# Credits

Credits go to:
- https://www.joshwcomeau.com/css/custom-css-reset/ and https://piccalil.li/blog/a-modern-css-reset/ for inspiration on reset.css

`Made with ❤ by @cmmdmx`