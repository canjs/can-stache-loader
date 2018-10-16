[![version](https://img.shields.io/npm/v/can-stache-loader.svg)](https://www.npmjs.com/package/can-stache-loader)
[![dependencies](https://img.shields.io/david/macku/can-stache-loader.svg)](https://david-dm.org/macku/can-stache-loader)
[![dev dependencies](https://img.shields.io/david/dev/macku/can-stache-loader.svg)](https://david-dm.org/macku/can-stache-loader?type=dev)

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# CanJS Stache template loader for webpack

Compiles [CanJS Stache](https://github.com/canjs/can-stache) templates with [can-view-parser](https://github.com/canjs/can-view-parser) and allows to load them with [webpack](https://webpack.github.io/)


## How to install

### NPM and Yarn

You can install the library using [**NPM**](https://www.npmjs.com):

```bash
npm install can-stache-loader --save-dev
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn add can-stache-loader
```

## How to use it


### Configure webpack 2+

**webpack.config.js**

```js
{
  module: {
    rules: [
      {
        test: /\.stache$/,
        use: {
          loader: 'can-stache-loader'
        }
      }
    ]
  }
}
```

### Import stache templates in your [CanJS](https://canjs.com/) project

```js
import tpl from './template.stache';

const html = tpl({
 foo: 'bar'
});
```

## License
[MIT](https://opensource.org/licenses/MIT)
