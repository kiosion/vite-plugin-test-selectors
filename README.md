<div align='center'>
  <h1>vite-plugin-test-selectors</h1>
  <p>Vite plugin for stripping test attributes in production builds</p>

  <img src='https://user-images.githubusercontent.com/34040324/181411503-a9d6ed3e-75ba-4258-85be-7070a276d496.png' width='750' alt='Demo' />
</div>

## Installation

> **Warning:**
> This plugin is still in development. Please don't use it in any production setting.

Install using yarn or npm:
```bash
yarn add vite-plugin-test-selectors -D
```

## Usage

Add to your vite config:
```js
import { defineConfig } from 'vite';
import StripTestSelectors from 'vite-plugin-test-selectors';

export default defineConfig({
  plugins: [
    StripTestSelectors()
  ]
});
```

Then, customize any of the following options:

```js
StripTestSelectors({
  dev: false,
  selectors: ['data-test'],
  suffixes: ['.jsx', '.tsx', '.vue', '.svelte'],
})
```

'Dev' is a boolean that determines whether to apply the plugin on serve or build. It defaults to 'false', only stripping test attributes in production builds.

The provided selectors are optional (defaulting to only 'data-test'), and are parsed as `selector-*`, where `*` is any string optionally followed by a value assignment. For example:

```html
<!-- Will not be stripped -->
<Component class="someClass" data-test />
<!-- Will be stripped -->
<Component class="someClass" data-test-component data-test-id="someId" />
```

Suffixes are also optional, and are an array of any valid file extensions. They default to '.jsx', '.tsx', '.vue', and '.svelte'.

For example usage, check out the [included demos](demos/).

## Supported frameworks

- React (in progress)
- Vue (in progress)
- Svelte

## Testing

```bash
yarn test
```

## Credits

Authors: [kiosion](https://github.com/kiosion/vite-plugin-test-selectors);
