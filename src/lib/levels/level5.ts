'use strict';

import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level5 extends LevelBase implements ILevel {
    public readonly input: string;

    constructor() {
        super();

        this.input = super.readInput('../input/day5.txt')[0];
    }

    public solve1() {
        return this.react(this.input).length.toString();
    }

    public solve2() {
        const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let len = this.input.length;

        for (let i = 0; i < alphabet.length; i++) {
            const regexp = new RegExp(alphabet[i], 'gi');
            const polymer = this.input.replace(regexp, '');
            const reactionResult = this.react(polymer);

            if (reactionResult.length < len) {
                len = reactionResult.length;
            }
        }

        return len.toString();
    }

    private react(polymer: string): string {
        for (let i = 0; i < polymer.length - 1; i++) {
            const part = polymer.substr(i, 2);

            if (
                /(([a-z][A-Z])|([A-Z][a-z]))/.test(part) &&
                part.substr(0, 1).toLowerCase() === part.substr(1).toLowerCase()
            ) {
                polymer = polymer.replace(part, '');
                i = Math.min(i - 2, 0);
            }
        }

        return polymer;
    }
}
