# APLCustomFonts

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This module allows for an easy implementation of custom fonts for the [Alexa Presentation Language](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/understand-apl.html "Alexa Presentation Language") at runtime. This module converts any text in to an APL-compatible [Alexa Vector Graphic (AVG)](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-avg-format.html "Alexa Vector Graphic (AVG)") that can be easily implemented in any APL document. 

## Installation
This module requires NodeJS. 
```
$ npm install --save apl-custom-fonts
```

## Constructor

Here is an example of initializing the module, loading a font and converting it into an AVG.

```js
const APLCustomFonts = require('apl-custom-fonts').default;

const customFont = new APLCustomFonts("Hello world!", {
    fill: 'black',
    fontSize: 72
});

customFont.loadFont('./fonts/OpenSans_Medium.ttf');
console.log(JSON.stringify(customFont.getAVG()));
```

## API

### `.loadFont()`
Used to synchronously load a font in memory. The preferred file types are **.ttf** or **.otf**.

### `.getAVG(text?: string)`
Convert text to AVG. Optionally uses a **text** parameter for passing text to convert to AVG.

### `.getPath(text?: string)`
Convert text to raw path data. Optionally uses a **text** parameter for passing text to convert to path data.

### `.getSVG(text?: string)`
Convert text to SVG. Optionally uses a **text** parameter for passing text to convert to SVG.

### `.getDimensions()`
Get dimensions of path data.

## License

MIT

## Credits

APLCustomFonts depends on the following modules:

- [text-to-svg](https://www.npmjs.com/package/text-to-svg) by [shrhdk](https://www.npmjs.com/~shrhdk)
	Depends on the following softwares:
	- [opentype.js](https://github.com/nodebox/opentype.js): Copyright (c) 2015 Frederik De Bleser
	- [commander](https://github.com/tj/commander.js): Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>
- [svgpath](https://www.npmjs.com/package/svgpath/v/2.3.0) by [vitaly](https://www.npmjs.com/~vitaly)

A big shoutout goes out to these guys! Thanks for making this module possible.

[npm-url]: https://npmjs.org/package/text-to-svg
[npm-image]: https://badge.fury.io/js/text-to-svg.svg
[travis-url]: https://travis-ci.org/shrhdk/text-to-svg
[travis-image]: https://travis-ci.org/shrhdk/text-to-svg.svg?branch=master