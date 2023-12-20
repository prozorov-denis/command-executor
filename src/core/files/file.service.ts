import { promises, existsSync } from 'fs';
import { join } from 'path';

export class FileService {
    public getFilePath(path: string, name: string, ext: string): string {
        return join(__dirname, path, `${name}.${ext}`);
    }

    public async deleteFileIfExists(path: string): Promise<void> {
        if (existsSync(path)) {
            return promises.unlink(path);
        }
    }
}