import inquirer from 'inquirer';
import { PromptResultType, PromptType } from './prompt.types';

export class PromptService {
    async input<T extends PromptType>(message: string, type: T): Promise<PromptResultType<T>> {
        const { result } = await inquirer.prompt([
            {
                name: 'result',
                type,
                message
            }
        ]);
        return result;
    }
}