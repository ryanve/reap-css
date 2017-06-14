# reap-css
CSS AST traversal filters designed for CSS parsed by [`read-css`](https://www.npmjs.com/package/read-css) or [`css.parse`](https://www.npmjs.com/package/css)

## install
```
npm install reap-css
```

## usage

```js
const reap = require('reap-css')
const read = require('read-css')
const tree = read("test.css")
const harvest = reap(tree)

harvest.selectors() // [".apple", ".orange", "button:enabled", ".flex\\@portrait"]
harvest.properties() // ["color", "border-radius", "color", "cursor", "display"]
harvest.media() // ["(color), (update)", "(orientation: portrait)"]
```

## methods

### `.selectors()`

Get array of selectors.

```js
reap(tree).selectors()
```

### `.properties()`

Get array of properties.

```js
reap(tree).properties()
```

### `.media()`

Get array of media queries.

```js
reap(tree).media()
```

### `.having(key)`

Get array of AST nodes having the specified key

```js
reap(tree).having("media")
```

### `.type(type)`

Get array of AST nodes with the specified type.

```js
reap(tree).type("rule")
```

## traversal

Reap uses [traverse](https://www.npmjs.com/package/traverse) to travese the AST. The traversal instance for the current tree is accessible via `.traversal`

```js
reap(tree).traversal
```

## develop

```
npm install
npm test
npm run demo
```
