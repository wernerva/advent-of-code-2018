'use strict';

import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level4 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day4.txt');
    }

    public solve1() {
        const log: LogEntry[] = this.convertInputToLogEntriesAndSort();
        const guardSleepData: { [id: number]: SleepData } = this.getGuardSleepDataDictionary(log);
        let guardId = 0;
        let maxSleep = 0;
        let mostCommonSleepMinute: { minute: number; count: number };

        for (const key in guardSleepData) {
            if (guardSleepData[key]) {
                if (guardSleepData[key].totalSleep > maxSleep) {
                    guardId = parseInt(key, 10);
                    maxSleep = guardSleepData[key].totalSleep;
                }
            }
        }

        mostCommonSleepMinute = guardSleepData[guardId].mostCommonSleepMinute;

        return `${guardId} * ${mostCommonSleepMinute.minute} = ${(guardId * mostCommonSleepMinute.minute).toString()}`;
    }

    public solve2() {
        const log: LogEntry[] = this.convertInputToLogEntriesAndSort();
        const guardSleepData: { [id: number]: SleepData } = this.getGuardSleepDataDictionary(log);
        let mostCommonSleepMinute: { minute: number; count: number } = { minute: 0, count: 0 };
        let guardId = 0;

        for (const key in guardSleepData) {
            if (guardSleepData[key]) {
                const guardMostCommonSleepMinute = guardSleepData[key].mostCommonSleepMinute;

                if (guardMostCommonSleepMinute.count > mostCommonSleepMinute.count) {
                    mostCommonSleepMinute = guardMostCommonSleepMinute;
                    guardId = parseInt(key, 10);
                }
            }
        }

        return `${guardId} * ${mostCommonSleepMinute.minute} = ${(guardId * mostCommonSleepMinute.minute).toString()}`;
    }

    private convertInputToLogEntriesAndSort(): LogEntry[] {
        const logEntries: LogEntry[] = this.input.map(i => this.parseLogEntry(i));
        logEntries.sort(this.logSortFn);
        return logEntries;
    }

    private getGuardSleepDataDictionary(log: LogEntry[]): { [id: number]: SleepData } {
        const guardSleepData: { [id: number]: SleepData } = {};
        let guardId = 0;

        for (let i = 0; i < log.length; i++) {
            if (log[i].isShiftStart) {
                guardId = log[i].getGuardId();

                if (!guardSleepData[guardId]) {
                    guardSleepData[guardId] = new SleepData();
                }
            } else if (log[i].isWakesUp) {
                guardSleepData[guardId].addSleepDate(log[i - 1].timestamp, log[i].timestamp);
            }
        }

        return guardSleepData;
    }

    private parseLogEntry(logEntry: string): LogEntry {
        const matches = /^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.+)$/gi.exec(logEntry);

        if (!matches || matches.length < 6) {
            throw new Error(`Invalid log entry '${logEntry}'.`);
        }

        return new LogEntry(
            new Date(
                parseInt(matches[1], 10),
                parseInt(matches[2], 10) - 1,
                parseInt(matches[3], 10),
                parseInt(matches[4], 10),
                parseInt(matches[5], 10),
                0
            ),
            matches[6]
        );
    }

    private logSortFn(a: LogEntry, b: LogEntry): number {
        return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0;
    }
}

export class LogEntry {
    public timestamp = new Date(0, 0, 0);
    public event = '';
    private shiftStartRegex: RegExp = /^guard #(\d+) begins shift$/gi;
    private wakesUpRegex: RegExp = /^wakes up$/gi;

    constructor(date: Date, event: string) {
        this.timestamp = date;
        this.event = event;
    }

    public get isShiftStart(): boolean {
        return this.shiftStartRegex.test(this.event);
    }

    public get isWakesUp(): boolean {
        return this.wakesUpRegex.test(this.event);
    }

    public toString(): string {
        return (
            `[${this.timestamp.getFullYear()}-` +
            `${this.timestamp.getMonth()}-` +
            `${this.timestamp.getDate()} ` +
            `${this.timestamp.getHours()}:${this.timestamp.getMinutes()}]` +
            `${this.event}`
        );
    }

    public getGuardId(): number {
        const matches = /^guard #(\d+) begins shift$/gi.exec(this.event);

        if (!matches || matches.length < 2) {
            throw new Error('LogEntry event does not contain guard #.');
        }

        return parseInt(matches[1], 10);
    }
}

export class SleepData {
    private readonly _sleepDates: { [date: string]: boolean[] };
    private _totalSleep: number;

    constructor() {
        this._sleepDates = {};
        this._totalSleep = 0;
    }

    private get sleepDates(): { [date: string]: boolean[] } {
        return this._sleepDates;
    }

    public addSleepDate(startDate: Date, endDate: Date): void {
        const key = `${startDate.toISOString().substr(0, 10)}`;
        const startMinute = startDate.getMinutes();
        const endMinute = endDate.getMinutes();

        if (!this.sleepDates[key]) {
            this.sleepDates[key] = new Array(60).fill(false);
        }

        for (let i = startMinute; i < endMinute; i++) {
            this.sleepDates[key][i] = true;
            this._totalSleep++;
        }
    }

    public get mostCommonSleepMinute(): { minute: number; count: number } {
        const sleepMinuteCounts: number[] = new Array(60).fill(0);
        const result: { minute: number; count: number } = { minute: 0, count: 0 };

        for (const key in this._sleepDates) {
            if (this._sleepDates[key]) {
                for (let i = 0; i < 60; i++) {
                    sleepMinuteCounts[i] += this._sleepDates[key][i] ? 1 : 0;
                }
            }
        }

        for (let i = 0; i < sleepMinuteCounts.length; i++) {
            if (sleepMinuteCounts[i] > result.count) {
                result.minute = i;
                result.count = sleepMinuteCounts[i];
            }
        }

        return result;
    }

    public get totalSleep(): number {
        // return this._totalSleep;
        let total = 0;

        for (const key in this.sleepDates) {
            if (this.sleepDates[key]) {
                for (let i = 0; i < 60; i++) {
                    total += this.sleepDates[key][i] === true ? 1 : 0;
                }
            }
        }

        return total;
    }
}
