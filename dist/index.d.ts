interface Options {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fontSize?: number;
    letterSpacing: number;
}
export default class APLCustomFonts {
    text: string;
    private fill;
    private stroke;
    private strokeWidth;
    private fontSize;
    private letterSpacing;
    private textToSVG;
    constructor(text: string, options?: Options);
    loadFont(path: string): void;
    private updateOptions;
    setOptions(options: Options): void;
    setText(text: string): void;
    private getOptions;
    getSVG(text?: string): any;
    private translateSVGPath;
    getPath(text?: string): any;
    getDimensions(): {
        width: number;
        height: number;
        y: number;
        x: number;
    } | undefined;
    getAVG(text?: string): string;
}
export {};
