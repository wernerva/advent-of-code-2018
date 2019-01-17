'use strict';

import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level3 extends LevelBase implements ILevel {
    public readonly input: string[];
    private material = new Rectangle(0, 0, 0, 1000, 1000);

    constructor() {
        super();

        this.input = super.readInput('../input/day3.txt');
    }

    public solve1() {
        let totalOverlappingArea = 0;
        const claims: Rectangle[] = [];

        this.input.forEach(i => claims.push(this.parseRectangle(i)));

        for (let x = 0; x < this.material.width; x++) {
            for (let y = 0; y < this.material.height; y++) {
                const rect = new Rectangle(0, x, y, 1, 1);
                let count = 0;

                for (let c = 0; c < claims.length; c++) {
                    if (claims[c].testIntersect(rect)) {
                        count++;
                    }
                }

                if (count > 1) {
                    totalOverlappingArea++;
                }
            }
        }

        return totalOverlappingArea.toString();
    }

    public solve2() {
        for (let i = 0; i < this.input.length; i++) {
            const claimA = this.parseRectangle(this.input[i]);
            let intersectCount = 0;

            for (let j = 0; j < this.input.length; j++) {
                const claimB = this.parseRectangle(this.input[j]);

                if (claimA.id === claimB.id) {
                    continue;
                }

                const intersect = claimA.testIntersect(claimB);

                if (intersect) {
                    intersectCount++;
                }
            }

            if (intersectCount === 0) {
                return claimA.id.toString();
            }
        }

        return 'not found';
    }

    private parseRectangle(input: string): Rectangle {
        const claimRegex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/gi;
        const match = claimRegex.exec(input);

        if (match) {
            return new Rectangle(
                parseInt(match[1], 10),
                parseInt(match[2], 10),
                parseInt(match[3], 10),
                parseInt(match[4], 10),
                parseInt(match[5], 10)
            );
        } else {
            throw new Error(`Invalid input. Could not parse '${input}'.`);
        }
    }
}

export class Rectangle {
    private readonly _id: number;
    private readonly _xMin: number;
    private readonly _yMin: number;
    private readonly _xMax: number;
    private readonly _yMax: number;
    private readonly _width: number;
    private readonly _height: number;

    constructor(id: number, x: number, y: number, width: number, height: number) {
        this._id = id;
        this._xMin = x;
        this._yMin = y;
        this._xMax = x + width;
        this._yMax = y + height;
        this._width = width;
        this._height = height;
    }

    get id(): number {
        return this._id;
    }

    get xMin(): number {
        return this._xMin;
    }

    get yMin(): number {
        return this._yMin;
    }

    get xMax(): number {
        return this._xMax;
    }

    get yMax(): number {
        return this._yMax;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get area(): number {
        return this._width * this._height;
    }

    public testIntersect(otherClaim: Rectangle): boolean {
        return (
            otherClaim.xMax > this._xMin &&
            otherClaim.xMin < this._xMax &&
            otherClaim.yMax > this._yMin &&
            otherClaim.yMin < this._yMax
        );
    }

    public toString() {
        return `#${this._id} @ ${this._xMin},${this._yMin}: ${this._width}x${this._height}`;
    }
}
