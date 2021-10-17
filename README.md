# palstek
A bunch of useful extensions for react projects

---


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

# Contribution

If you want to contribute, feel free to do so. Just create your own branch and submit a PR with the changes.

`Made with ❤ by @cmmdmx`