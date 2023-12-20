import { ICommandExec } from '../../core/executor/command.types';

export interface IFfmpegInput {
    inputPath: string;
    outputPath: string;
    width: number;
    height: number;
}

export interface ICommandExecFfmpeg extends ICommandExec {
    outputPath: string;
}