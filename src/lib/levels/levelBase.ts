import { InputParser } from '../inputParser';
import * as path from 'path';

export abstract class LevelBase {
    public readInput(relativeFilepath: string): string[] {
        return InputParser.parseInput(path.resolve(__dirname, relativeFilepath));
    }
}
