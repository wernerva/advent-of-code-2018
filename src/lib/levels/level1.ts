import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level1 extends LevelBase implements ILevel {
    public readonly input: number[];

    constructor() {
        super();

        this.input = super.readInput('../input/day1.txt').map(i => parseInt(i, 10));
    }

    public solve1(): string {
        let total = 0;

        this.input.forEach(i => (total += i));

        return total.toString();
    }

    public solve2(): string {
        const freqArr = [];
        let total = 0;
        let idx = 0;

        do {
            freqArr.push(total);
            total += this.input[idx];
            idx = ++idx % this.input.length;
        } while (freqArr.indexOf(total) < 0);

        return total + '';
    }
}
