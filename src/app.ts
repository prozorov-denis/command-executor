import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { ConsoleLogger } from './out/console-logger/console-logger';

class App {
    async run() {
        const logger = ConsoleLogger.getInstance();
        const executor = new FfmpegExecutor(logger);
        executor.execute();
    }
}

const app = new App();
app.run();