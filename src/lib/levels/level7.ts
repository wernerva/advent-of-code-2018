import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';
import { strict } from 'assert';
import { debuglog } from 'util';

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
        const resultArr: string[] = [];
        const instructionArr: Instruction[] = this.inputToInstructionArray(60); // convert input to array of Instruction
        const requiredLength = instructionArr.length;
        let availableInstructions: Instruction[];
        const maxJobs = 5;
        const workInProgress: Instruction[] = [];
        let finishedWork: Instruction[] = [];
        let counter = 0;

        const getWorkInProgress = function(): void {
            availableInstructions = instructionArr
                .filter(i => i.isAvailable && !workInProgress.some(wip => wip.id === i.id))
                .splice(0, maxJobs - workInProgress.length);

            availableInstructions.forEach(i => {
                console.log(`${counter}s: ${i.id} started`);
                workInProgress.push(i);
                workInProgress.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
            });

            console.log(`${counter}s: ${workInProgress.length} workers [${workInProgress.map(i => i.id).join(', ')}]`);
        };

        // start looping until the result array length equals the number of instructions
        while (resultArr.length < requiredLength) {
            finishedWork = [];
            getWorkInProgress();
            counter++;

            for (let wipIdx = 0, len = workInProgress.length; wipIdx < len; wipIdx++) {
                const idx = instructionArr.findIndex(i => i.id === workInProgress[wipIdx].id);

                instructionArr[idx].tick();

                if (instructionArr[idx].done) {
                    console.log(`${counter}s: ${workInProgress[wipIdx].id} finished`);

                    // add the Instruction ID to the result array
                    resultArr.push(instructionArr[idx].id);

                    // update prerequisites
                    instructionArr.forEach(i => {
                        const insId = instructionArr[idx].id;

                        if (i.prerequisites[insId] !== undefined) {
                            i.prerequisites[insId] = true;
                        }
                    });

                    // remove the instruction from the array - we're done with it
                    finishedWork.push(instructionArr.splice(idx, 1)[0]);
                }
            }

            // remove from work in progress
            finishedWork.forEach(fw => {
                workInProgress.splice(workInProgress.findIndex(wip => fw.id === wip.id), 1);
            });
        }

        return `time: ${counter}, order: ${resultArr.join('')}`;
    }

    private inputToInstructionArray(defaultTimeToComplete: number = 0): Instruction[] {
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
                instruction = new Instruction(rule.instruction, defaultTimeToComplete);
                instruction.prerequisites[rule.prerequisite] = false;
                instructionArr.push(instruction);
            } else {
                instructionArr[idx].prerequisites[rule.prerequisite] = false;
            }

            idx = instructionArr.findIndex(ins => ins.id === rule.prerequisite);

            if (idx === -1) {
                instruction = new Instruction(rule.prerequisite, defaultTimeToComplete);
                instructionArr.push(instruction);
            }
        });

        instructionArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

        return instructionArr;
    }
}

export class Instruction {
    private readonly _id: string;
    private readonly _timeToComplete: number;
    private readonly _ids = ' ABCDEFGHIJKLMNOPQRSTUVWXUZ';
    private _timeTaken: number;
    public prerequisites: { [id: string]: boolean };

    constructor(id: string, defaultTimeToComplete: number = 0) {
        this._id = id;
        this.prerequisites = {};
        this._timeToComplete = defaultTimeToComplete + this._ids.indexOf(id.toUpperCase());
        this._timeTaken = 0;
    }

    public get id(): string {
        return this._id;
    }

    public get timeToComplete(): number {
        return this._timeToComplete;
    }

    public get isAvailable(): boolean {
        const keys = Object.keys(this.prerequisites);

        if (keys.length === 0) {
            return true;
        }

        return keys.every(i => this.prerequisites[i] === true);
    }

    public get done(): boolean {
        return this._timeTaken >= this._timeToComplete;
    }

    public tick(): void {
        this._timeTaken++;
    }
}
