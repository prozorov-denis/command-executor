import { PromptService } from './core/prompt/prompt.service';

class App {
    async run() {
        const promptService = new PromptService();
        const res = await promptService.input('Number', 'number');
        console.log(res);
    }
}

const app = new App();
app.run();