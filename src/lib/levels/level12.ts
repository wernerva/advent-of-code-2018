import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level12 extends LevelBase implements ILevel {
    public readonly input: { initialState: string; rules: string[] };

    constructor() {
        super();
        const stateRegex = /[.#]+/gi;
        const inputArr = super.readInput('../input/day12.txt');
        const stateMatch = stateRegex.exec(inputArr[0]);
        let initState: string;

        if (!stateMatch || stateMatch.length !== 1) {
            throw new Error('Input does not contain initial state.');
        }

        initState = stateMatch[0];

        this.input = { initialState: initState, rules: inputArr.filter((e, i) => i > 1) };
    }

    public solve1(): string {
        const gof = new GameOfPlants(this.input.initialState, this.input.rules);

        for (let i = 0; i < 20; i++) {
            gof.age();
        }

        return `First populated index: ${gof.firstPopulatedPotIndex}, State: ${gof.state},  Score: ${gof.score}`;
    }

    public solve2(): string {
        const gof = new GameOfPlants(this.input.initialState, this.input.rules);
        let lastState = '';
        let thisState = '';
        let repeatCount = 0;
        const generations = 50000000000;

        for (let i = 0; i < generations; i++) {
            gof.age();

            thisState = gof.state;

            if (thisState === lastState) {
                repeatCount++;
            } else {
                repeatCount = 0;
            }

            if (repeatCount > 1) {
                return `Repetition detected from generation ${gof.generation -
                    repeatCount}. Predicting score after ${generations} generations: ${gof.predictScore(
                    thisState,
                    gof.firstPopulatedPotIndex,
                    gof.generation,
                    generations
                )}`;
            }

            lastState = thisState;
        }

        return `Score after ${generations} generations: ${gof.score}`;
    }
}

export class Rule {
    private readonly _state: string;
    private readonly _result: string;

    constructor(val: string) {
        const regex = /^([.#]{5}) => ([.#])$/gi;
        const match = regex.exec(val);

        if (!match || match.length !== 3) {
            throw new Error(`${val} is not a valid rule.`);
        }

        this._state = match[1];
        this._result = match[2];
    }

    public get state(): string {
        return this._state;
    }

    public get result(): string {
        return this._result;
    }
}

export class GameOfPlants {
    private _state: string;
    private _rules: Rule[];
    private _firstIdx: number;
    private _generation: number;

    constructor(initialState: string, rules: string[]) {
        this._state = initialState;
        this._rules = rules.map(r => new Rule(r));
        this._firstIdx = 0;
        this._generation = 0;
    }

    public get state(): string {
        return this._state;
    }

    public get score(): number {
        return this.calculateScore(this._state, this._firstIdx);
    }

    public get firstPopulatedPotIndex(): number {
        return this._firstIdx;
    }

    public get generation(): number {
        return this._generation;
    }

    public age(): string {
        const paddedState = `...${this._state}...`;
        let newState = '..';
        let subStr: string;
        const rulesMap = new Map<string, string>();
        let firstFullPotIdx: number;

        this._generation++;
        this._firstIdx -= 3;
        this._rules.forEach(i => rulesMap.set(i.state, i.result));

        for (let i = 0, l = paddedState.length - 4; i < l; i++) {
            subStr = paddedState.substr(i, 5) as string;

            if (rulesMap.has(subStr)) {
                newState += rulesMap.get(subStr);
            } else {
                throw new Error(`Could not find rule for ${subStr}`);
            }
        }

        firstFullPotIdx = newState.indexOf('#');

        this._firstIdx = this._firstIdx + firstFullPotIdx;

        newState = newState.substring(firstFullPotIdx, newState.lastIndexOf('#') + 1);

        this._state = newState;

        return this._state;
    }

    public predictScore(
        repeatedState: string,
        firstPopulatedIndex: number,
        currentGen: number,
        targetGen: number
    ): number {
        const offset = currentGen - firstPopulatedIndex;
        const adjustedIndex = targetGen - offset;

        return this.calculateScore(repeatedState, adjustedIndex);
    }

    private calculateScore(state: string, firstPopulatedIndex: number): number {
        let score = 0;
        let idx = firstPopulatedIndex;

        [...state].forEach(p => {
            if (p === '#') {
                score += idx;
            }

            idx++;
        });

        return score;
    }
}
