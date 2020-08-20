<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <a href="https://github.com/chakra-ui/chakra-ui-vue">
    <img src="https://res.cloudinary.com/xtellar/image/upload/v1595681330/chakra-ui/chakra-loader-logo.png" alt="chakra-loader webpack symbol" width="300" />
  </a>
</p>

<h2 align="center"> A webpack plugin for auto-importing and tree-shaking `@chakra-ui/vue` components</h2>

## Features
✅ Automatically import only used Chakra components
✅ Preserves tree-shaking of Chakra components
✅ Better development experience

### Installation
With Yarn:

```bash
yarn add chakra-loader -D
```
With NPM:

```bash
npm install chakra-loader --save-dev
```

### Usage
If you're using webpack with Vue CLI or Nuxt.js for your Chakra project, import the `ChakraLoaderPlugin` from the `chakra-loader` package and add it to your `vue.config.js` file.

**With Vue CLI**
```js
/* vue.config.js */

const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = {
  configureWebpack: {
    plugins: [
      new ChakraLoaderPlugin()
    ]
  }
}

```
**With `webpack.config.js`**
```js
/* webkack.config.js */

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = {
  // ... other options
  plugins: [
    new VueLoaderPlugin(),
    new ChakraLoaderPlugin()
  ]
}
```
**With Nuxt.js**
```js
/* nuxt.config.js */

import { ChakraLoaderPlugin } from 'chakra-loader'

export default {
  build: {
    extend(config) {
      config.plugins.push(
        new ChakraLoaderPlugin()
      )
    }
  }
}
```

### How it works
`ChakraLoaderPlugin` will analyse your SFC template at during development and at build time, and scan it for all Chakra UI Vue components that you consume in it. The loader will then proceed to automatically import those components and register them while preserving treeshaking.

For example, consider the component below, `Component.vue` which uses Chakra's `CBox` and `CButton` components.
```vue
<template>
  <c-box p="3" m="auto" bg="tomato" font-weight="bold" color="white">
    Chakra UI Vue Box
  </c-box>
  <c-button>
    Hello world!
  </c-button>
</template>
```

Using `chakra-loader` will yield:
```vue
<template>
  <c-box p="3" m="auto" bg="tomato" font-weight="bold" color="white">
    Chakra UI Vue Box
  </c-box>
  <c-button>
    Hello world!
  </c-button>
</template>

<script>
// 👇🏽 Automatically imports and registers
//    the CBox and CButton components from Chakra UI Vue. 🎉

import { CBox, CButton } from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CBox,
    CButton
  }
}
</script>
```

### Credits
This project was largely inspired by the great work done in amazing Vue projects like [`nuxt/components`](https://github.com/nuxt/components) and [`vuetify-loader`](https://github.com/vuetifyjs/vuetify-loader).


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jbakebwa.dev"><img src="https://avatars2.githubusercontent.com/u/21237954?v=4" width="100px;" alt=""/><br /><sub><b>Jonathan Bakebwa</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-loader/commits?author=codebender828" title="Code">💻</a> <a href="#ideas-codebender828" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://dominuskelvin.dev"><img src="https://avatars0.githubusercontent.com/u/24433274?v=4" width="100px;" alt=""/><br /><sub><b>Omereshone Kelvin Oghenerhoro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-loader/commits?author=DominusKelvin" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
