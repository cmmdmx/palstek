
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
    - [filterProps](#filterprops)
    - [autoFilterProps](#autofilterprops)
- [Future Plans](#future-plans)
- [Contribution](#contribution)

---

# Intro

Why "palstek"? - Because this is one of the most used knots on a sailboat. Just as useful, selected functions should be provided here. Especially designed as extension to functional react projects, react libraries and design systems.

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

---

# Future Plans

- Include the possibility to only install single functions instead of the whole package, like `npm i palstek/resolveClassNames`.

# Contribution

If you want to contribute, feel free to do so. Just create your own branch and submit a PR with the changes.

`Made with ❤ by @cmmdmx`