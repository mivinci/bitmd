# BitMD

📃 A pluggable markdown editor/viewer built with [marked](https://marked.js.org).

![screenshot](./docs/screenshot.png)

BitMD is being developed using [bun](https://bun.sh) as the package manager and [vite](https://vitejs.dev) as the package bundler which's cool :)

## Features

- Support for multiple frameworks, themes and locales.
- Compatible with existing [marked extensions](https://marked.js.org/using_advanced#extensions)


## Examples

For VanillaJS,

```js
new bitmd.BitMD({
  target: document.querySelector("#app"),
  props: {
  value: "# Heading",
    plugins: [
      bitmd_plugin_katex(),
      bitmd_plugin_highlight(),
    ]
  }
});
```

Check out [examples/vanilla](./examples/vanilla/index.html) for the full code snippet. 