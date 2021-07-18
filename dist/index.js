"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextToSVG = require('text-to-svg');
var svgpath = require('svgpath');
var APLCustomFonts = /** @class */ (function () {
    function APLCustomFonts(text, options) {
        this.fill = 'black';
        this.stroke = '';
        this.strokeWidth = 1;
        this.fontSize = 72;
        this.letterSpacing = 0.1;
        this.text = text;
        if (options) {
            this.fill = options.fill || this.fill,
                this.stroke = options.stroke || this.stroke,
                this.strokeWidth = options.strokeWidth || this.strokeWidth;
            this.fontSize = options.fontSize || this.fontSize,
                this.letterSpacing = options.letterSpacing || this.letterSpacing;
        }
    }
    APLCustomFonts.prototype.loadFont = function (path) {
        this.textToSVG = TextToSVG.loadSync(path);
    };
    APLCustomFonts.prototype.getOptions = function () {
        return {
            fontSize: this.fontSize,
            letterSpacing: this.letterSpacing
        };
    };
    APLCustomFonts.prototype.getSVG = function (text) {
        return this.textToSVG.getSVG(text || this.text, this.getOptions());
    };
    APLCustomFonts.prototype.translateSVGPath = function (path) {
        var dimensions = this.getDimensions();
        if (!dimensions || !dimensions.y)
            return;
        console.log(path);
        return svgpath.from(path).translate(0, (dimensions.y * -1)).toString();
    };
    APLCustomFonts.prototype.getPath = function (text) {
        return this.textToSVG.getD(text || this.text, this.getOptions());
    };
    APLCustomFonts.prototype.getDimensions = function () {
        var metrics = this.textToSVG.getMetrics(this.text, this.getOptions());
        if (!metrics)
            return;
        return {
            width: Math.ceil(metrics.width),
            height: Math.ceil(metrics.height),
            y: Math.ceil(metrics.y),
            x: Math.ceil(metrics.x),
        };
    };
    APLCustomFonts.prototype.getAVG = function (text) {
        console.log(this.textToSVG.getMetrics(text || this.text));
        var dimensions = this.getDimensions();
        return JSON.stringify({
            type: 'AVG',
            description: text || this.text,
            version: "1.2",
            width: dimensions === null || dimensions === void 0 ? void 0 : dimensions.width,
            height: dimensions === null || dimensions === void 0 ? void 0 : dimensions.height,
            items: {
                type: 'path',
                fill: this.fill,
                stroke: this.stroke,
                strokeWidth: this.strokeWidth,
                pathData: this.translateSVGPath(this.getPath())
            }
        });
    };
    return APLCustomFonts;
}());
exports.default = APLCustomFonts;
