export type PromptType = 'number' | 'input' | 'password';

export type PromptResultType<T extends PromptType> =
    T extends 'number' ? number : string;