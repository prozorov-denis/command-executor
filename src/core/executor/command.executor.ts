import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface';
import { ICommandExec } from './command.types';

export abstract class CommandExecutor<Input> {
    constructor(private logger: IStreamLogger) {}

    public async execute() {
        const input = await this.prompt();
        const command = this.buildCommand(input);
        const stream = await this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<Input>;
    protected abstract buildCommand(input: Input): ICommandExec;
    protected abstract spawn(command: ICommandExec): Promise<ChildProcessWithoutNullStreams>;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}