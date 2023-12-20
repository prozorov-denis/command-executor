import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { PromptService } from '../../core/prompt/prompt.service';
import { FileService } from '../../core/files/file.service';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types';
import { FfmpegBuilder } from './ffmpeg.builder';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();
    private commandBuilder: FfmpegBuilder = new FfmpegBuilder();

    protected async prompt(): Promise<IFfmpegInput> {
        const inputPath = await this.promptService.input('Исходный файл:', 'input');
        const outputPath = await this.promptService.input('Итоговый файл:', 'input');
        const width = await this.promptService.input('Ширина:', 'number');
        const height = await this.promptService.input('Высота:', 'number');

        return {
            inputPath,
            outputPath,
            width,
            height
        };
    }

    protected buildCommand(input: IFfmpegInput): ICommandExecFfmpeg {
        return this.commandBuilder
            .setInputPath(input.inputPath)
            .setOutputPath(input.outputPath)
            .setVideoSize(input.width, input.height)
            .build();
    }

    protected async spawn({ command, args, outputPath }: ICommandExecFfmpeg): Promise<ChildProcessWithoutNullStreams> {
        await this.fileService.deleteFileIfExists(outputPath);
        return spawn(command, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}