# write-json

A JSON file-writing package designed for NPM initializers and places where node needs to write static files.

## installation

install: `npm i --D @afoot/write-json`
import: `import writeJson from '@afoot/write-json'`

## documentation

## example

const obj = {name: 'test', version: '0.0.1'};
const filename = 'package.json';

writeJson(filename, obj)

```

## license

[MIT](./LICENSE) © [Matthew Smith](http://www.niftinessafoot.com)

## made with ❤️ and ☕️ by

![Niftiness Afoot!](https://gist.githubusercontent.com/niftinessafoot/2dba588395cb557293d5f09aebcd2ab0/raw/770293c76bead4f0986ff959f3ea8880017d92c0/bot.svg?sanitize=true) [Matthew Smith](https://github.com/niftinessafoot)
```
