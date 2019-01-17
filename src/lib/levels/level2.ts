import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level2 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day2.txt');
    }

    public solve1(): string {
        let occursTwiceCount = 0;
        let occursThriceCount = 0;

        this.input.forEach(boxId => {
            const letterCollections = this.getLetterCounts(boxId);
            let addedToTwiceCount = false;
            let addedToThriceCount = false;

            letterCollections.forEach(lc => {
                if (lc.count === 2 && !addedToTwiceCount) {
                    occursTwiceCount++;
                    addedToTwiceCount = true;
                } else if (lc.count === 3 && !addedToThriceCount) {
                    occursThriceCount++;
                    addedToThriceCount = true;
                }
            });
        });

        return (occursTwiceCount * occursThriceCount).toString(10);
    }

    public solve2(): string {
        for (let i = 0; i < this.input.length; i++) {
            for (let j = i + 1; j < this.input.length; j++) {
                const charsInCommon = this.getCharsInCommon(this.input[i], this.input[j]);

                if (charsInCommon.length === this.input[i].length - 1) {
                    return charsInCommon;
                }
            }
        }

        return '';
    }

    private getLetterCounts(letters: string): LetterCount[] {
        const letterCollections: LetterCount[] = [];

        [...letters].forEach(letter => {
            let letterCountObj = letterCollections.find(lc => lc.letter === letter);

            if (!letterCountObj) {
                letterCountObj = new LetterCount();
                letterCountObj.letter = letter;
                letterCountObj.count = 1;
                letterCollections.push(letterCountObj);
            } else {
                letterCountObj.count++;
            }
        });

        return letterCollections;
    }

    private getCharsInCommon(a: string, b: string): string {
        const arrA = [...a];
        const arrB = [...b];
        let common = '';

        for (let i = 0; i < arrA.length; i++) {
            if (arrA[i] === arrB[i]) {
                common += arrA[i];
            }
        }

        return common;
    }
}

export class LetterCount {
    private _l: string;
    private _c: number;

    constructor() {
        this._l = '';
        this._c = 0;
    }

    get letter() {
        return this._l;
    }
    set letter(val) {
        this._l = val;
    }

    get count() {
        return this._c;
    }

    set count(val) {
        this._c = val;
    }
}
