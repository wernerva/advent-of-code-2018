import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level7 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day7.txt');
        // this.input = [
        //     'Step C must be finished before step A can begin.',
        //     'Step C must be finished before step F can begin.',
        //     'Step A must be finished before step B can begin.',
        //     'Step A must be finished before step D can begin.',
        //     'Step B must be finished before step E can begin.',
        //     'Step D must be finished before step E can begin.',
        //     'Step F must be finished before step E can begin.'
        // ];
    }

    public solve1(): string {
        const resultArr: string[] = [];
        const instructionArr: Instruction[] = this.inputToInstructionArray(); // convert input to array of Instruction
        const requiredLength = instructionArr.length;
        let idx: number;

        // start looping until the result array length equals the number of instructions
        while (resultArr.length < requiredLength) {
            // get the first available instruction (in alphabetical order)
            idx = instructionArr.findIndex(i => i.isAvailable);

            // add the Instruction ID to the result array
            resultArr.push(instructionArr[idx].id);

            // update prerequisites
            instructionArr.forEach(i => {
                const id = instructionArr[idx].id;

                if (i.prerequisites[id] !== undefined) {
                    i.prerequisites[id] = true;
                }
            });

            // remove the instruction from the array - we're done with it
            instructionArr.splice(idx, 1);
        }

        return resultArr.join('');
    }

    public solve2(): string {
        const instructionArr: TimedInstruction[] = this.inputToTimedInstructionArray(60); // convert input to array of
        const maxWorkers = 5;
        const requiredLength = instructionArr.length;
        let workers: TimedInstruction[] = [];
        let timeTaken = 0;
        let shortestTime = 0;
        let result = '';
        let log = '<br />';

        const getAvailableInstruction = function(count: number): TimedInstruction[] {
            return instructionArr
                .filter(i => i.isAvailable && !i.done && workers.findIndex(w => w.id === i.id) === -1)
                .splice(0, count);
        };

        while (result.length < requiredLength) {
            workers.push(...getAvailableInstruction(maxWorkers - workers.length));
            workers.sort((a, b) => a.timeLeft - b.timeLeft);
            shortestTime = workers[0].timeLeft;
            timeTaken += shortestTime;

            for (let i = 0, l = workers.length; i < l; i++) {
                workers[i].addTime(shortestTime);

                if (workers[i].timeLeft === 0) {
                    result += workers[i].id;
                }
            }

            log +=
                '<div>' +
                `</div><div style="display: inline-block; width: 50px; text-align: right;">${timeTaken}: &nbsp;</div>` +
                `<div style="display: inline-block; width: 70px;">${workers.map(i => i.id).join(' ')}</div>` +
                `<div style="display: inline-block; width: 500px;"> =&gt; ${result}</div>` +
                '</div>';

            workers = workers.filter(w => !w.done);
        }

        return log;
    }

    private inputToInstructionArray(): Instruction[] {
        const instructionArr: Instruction[] = [];

        this.input.forEach(i => {
            const regex = /([a-z]) must be finished before step ([a-z])/gi;
            const matches = regex.exec(i);
            let rule: { prerequisite: string; instruction: string };
            let idx: number;
            let instruction: Instruction;

            if (!matches || matches.length !== 3) {
                throw new Error(`'${i}' is not a valid instruction.`);
            }

            rule = { prerequisite: matches[1], instruction: matches[2] };

            idx = instructionArr.findIndex(ins => ins.id === rule.instruction);

            if (idx === -1) {
                instruction = new Instruction(rule.instruction);
                instruction.prerequisites[rule.prerequisite] = false;
                instructionArr.push(instruction);
            } else {
                instructionArr[idx].prerequisites[rule.prerequisite] = false;
            }

            idx = instructionArr.findIndex(ins => ins.id === rule.prerequisite);

            if (idx === -1) {
                instruction = new Instruction(rule.prerequisite);
                instructionArr.push(instruction);
            }
        });

        instructionArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

        return instructionArr;
    }

    private inputToTimedInstructionArray(defaultTimeTaken: number): TimedInstruction[] {
        const instructionArr: TimedInstruction[] = [];

        this.input.forEach(i => {
            const regex = /([a-z]) must be finished before step ([a-z])/gi;
            const matches = regex.exec(i);
            let rule: { prerequisite: string; instruction: string };
            let idx: number;
            let instruction: TimedInstruction;
            let prerequisite: TimedInstruction;

            if (!matches || matches.length !== 3) {
                throw new Error(`'${i}' is not a valid instruction.`);
            }

            rule = { prerequisite: matches[1], instruction: matches[2] };

            idx = instructionArr.findIndex(ins => ins.id === rule.instruction);

            if (idx === -1) {
                instruction = new TimedInstruction(rule.instruction, defaultTimeTaken);
                instructionArr.push(instruction);
            } else {
                instruction = instructionArr[idx];
            }

            idx = instructionArr.findIndex(ins => ins.id === rule.prerequisite);

            if (idx === -1) {
                prerequisite = new TimedInstruction(rule.prerequisite, defaultTimeTaken);
                instructionArr.push(prerequisite);
            } else {
                prerequisite = instructionArr[idx];
            }

            instruction.prerequisites[prerequisite.id] = prerequisite;

            // if (idx === -1) {
            //     instruction = new TimedInstruction(rule.instruction, defaultTimeTaken);
            //     prerequisite = new TimedInstruction(rule.prerequisite, defaultTimeTaken);
            //     instruction.prerequisites[rule.prerequisite] = prerequisite;
            //     instructionArr.push(instruction);
            // } else {
            //     prerequisite = new TimedInstruction(rule.prerequisite, defaultTimeTaken);
            //     instructionArr[idx].prerequisites[rule.prerequisite] = prerequisite;
            // }
            //
            // idx = instructionArr.findIndex(ins => ins.id === rule.prerequisite);
            //
            // if (idx === -1) {
            //     instruction = new TimedInstruction(rule.prerequisite, defaultTimeTaken);
            //     instructionArr.push(instruction);
            // }
        });

        instructionArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

        return instructionArr;
    }
}

export class Instruction {
    private readonly _id: string;
    public prerequisites: { [id: string]: boolean };
    public done: boolean;

    constructor(id: string) {
        this._id = id;
        this.prerequisites = {};
        this.done = false;
    }

    public get id(): string {
        return this._id;
    }

    public get isAvailable(): boolean {
        const keys = Object.keys(this.prerequisites);

        if (keys.length === 0) {
            return true;
        }

        return keys.every(i => this.prerequisites[i] === true);
    }
}

export class TimedInstruction {
    private readonly _id: string;
    private readonly _timeToComplete: number;
    private _timeTaken: number;
    public prerequisites: { [id: string]: TimedInstruction };
    private readonly _acceptableIds = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(id: string, defaultTimeToComplete: number) {
        if (!id || id.length !== 1 || this._acceptableIds.indexOf(id) === -1) {
            throw new Error(`Could not create Instruction. Invalid ID '${id}'`);
        }

        this._id = id;
        this.prerequisites = {};
        this._timeToComplete = defaultTimeToComplete + this._acceptableIds.indexOf(id.toUpperCase());
        this._timeTaken = 0;
    }

    public get id(): string {
        return this._id;
    }

    public get timeLeft(): number {
        return this._timeToComplete - this._timeTaken;
    }

    public get done(): boolean {
        return this._timeTaken >= this._timeToComplete;
    }

    public addTime(seconds: number): void {
        this._timeTaken += seconds;
    }

    public get isAvailable(): boolean {
        const keys = Object.keys(this.prerequisites);
        let prerequisitesDone: boolean;

        if (keys.length === 0) {
            return true;
        }

        prerequisitesDone = keys.every(i => this.prerequisites[i].done);

        return prerequisitesDone;
    }
}
