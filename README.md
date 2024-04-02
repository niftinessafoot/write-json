# write-json

A JSON file-writing package designed for NPM initializers and places where Node needs to write static files.

## installation

install: `npm i --D @afoot/write-json`

import: `import writeJson from '@afoot/write-json'`

## documentation

write-json takes the following params:

- **filename** | `string` name and extension of the file to be written
- **json** | `Object` any valid JSON statement. Ideally object literals or arrays
- **config** | `Object` configuration object (see below)

### config object breakdown

```js
{
 errorCallback: null, // Calls if file write fails
 willFormat: true, // Option to disable tab formatting
 root: `(current working directory)`, // File path to write
 writeOptions: {flag:'w'} // Node options object for `writeFile`
}
```

## example

```js
const obj = { name: 'test', version: '0.0.1' };
const filename = 'package.json';

writeJson(filename, obj);
```

## license

[MIT](./LICENSE) © [Matthew Smith](http://www.niftinessafoot.com)

## made with ❤️ and ☕️ by

![Niftiness Afoot!](https://gist.githubusercontent.com/niftinessafoot/2dba588395cb557293d5f09aebcd2ab0/raw/770293c76bead4f0986ff959f3ea8880017d92c0/bot.svg?sanitize=true) [Matthew Smith](https://github.com/niftinessafoot)
