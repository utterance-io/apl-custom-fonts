const TextToSVG = require('text-to-svg');
const svgpath = require('svgpath');

interface Options {
    fill?: string
    stroke?: string,
    strokeWidth?: number,
    fontSize?: number,
    letterSpacing: number,
}

export default class APLCustomFonts {
    text: string;
    private fill: string = 'black'
    private stroke: string = '';
    private strokeWidth: number = 1;
    private fontSize: number = 72;
    private letterSpacing: number = 0;
    private textToSVG: any;

    constructor(text: string, options?: Options) {
        this.text = text;
        if (options) this.updateOptions(options);
    }

    public loadFont(path: string) {
        this.textToSVG = TextToSVG.loadSync(path);
    }

    private updateOptions(options: Options) {
        this.fill = options.fill || this.fill;
        this.stroke = options.stroke || this.stroke;
        this.strokeWidth = options.strokeWidth || this.strokeWidth;
        this.fontSize = options.fontSize || this.fontSize;
        this.letterSpacing = options.letterSpacing || this.letterSpacing;
    }

    public setOptions(options: Options) {
        this.updateOptions(options);
    }

    public setText(text: string) {
        this.text = text;
    }

    private getOptions(): Options {
        return {
            fontSize: this.fontSize,
            letterSpacing: this.letterSpacing
        } as Options
    }

    public getSVG(text?: string) {
        return this.textToSVG.getSVG(text || this.text, this.getOptions());
    }

    private translateSVGPath(path: string) {
        const dimensions = this.getDimensions();
        if (!dimensions || !dimensions.y) return;
        console.log(path);
        return svgpath.from(path).translate(0, (dimensions.y * -1)).toString();
    }

    public getPath(text?: string) {
        return this.textToSVG.getD(text || this.text, this.getOptions());
    }

    public getDimensions() {
        const metrics = this.textToSVG.getMetrics(this.text, this.getOptions());
        if (!metrics) return;
        return {
            width: Math.ceil(metrics.width),
            height: Math.ceil(metrics.height),
            y: Math.ceil(metrics.y),
            x: Math.ceil(metrics.x),
        };
    }

    public getAVG(text?: string) {
        console.log(this.textToSVG.getMetrics(text || this.text));
        const dimensions = this.getDimensions();
        return JSON.stringify({
            type: 'AVG',
            description: text || this.text,
            version: "1.2",
            width: dimensions?.width,
            height: dimensions?.height,
            items: {
                type: 'path',
                fill: this.fill,
                stroke: this.stroke,
                strokeWidth: this.strokeWidth,
                pathData: this.translateSVGPath(this.getPath())
            }
        });
    }
}