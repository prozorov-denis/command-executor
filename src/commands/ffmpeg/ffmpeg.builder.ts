import { ICommandExec } from '../../core/executor/command.types';

export class FfmpegBuilder {
    private inputPath?: string;
    private outputPath?: string;
    private options: Map<string, string> = new Map();

    constructor() {
        this.options.set('-c:v', 'libx264');
    }

    setInputPath(path: string): this {
        this.inputPath = path;
        return this;
    }

    setVideoSize(width: number, height: number): this {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }

    setOutputPath(path: string): this {
        this.outputPath = path;
        return this;
    }

    build(): ICommandExec {
        if (!this.inputPath) {
            throw new Error('inpuPath must be set');
        }

        if (!this.outputPath) {
            throw new Error('outputPath must be set');
        }

        const args: string[] = ['-i', this.inputPath];

        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });

        args.push(this.outputPath);

        return {
            command: 'ffmpeg',
            args
        };
    }
}