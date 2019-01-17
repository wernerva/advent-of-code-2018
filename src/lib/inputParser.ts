import * as fs from 'fs';

export class InputParser {
    public static parseInput(path: string): string[] {
        return fs
            .readFileSync(path)
            .toString()
            .split('\r\n');
    }
}
