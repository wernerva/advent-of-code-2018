import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';
import { isNegativeNumberLiteral } from 'tslint';
import { isMainThread } from 'worker_threads';
import { strict } from 'assert';

export class Level10 extends LevelBase implements ILevel {
    public readonly input: Vector[];

    constructor() {
        super();

        this.input = super.readInput('../input/day10.txt').map(i => this.parseVector(i));
    }

    public solve1(): string {
        const contentArray: { width: number; height: number; time: number; svg: string }[] = [];
        let svg: { width: number; height: number; time: number; svg: string };

        for (let i = 0; i < 100000; i++) {
            svg = this.createSvg(i);

            if (svg.width < 500 && svg.height < 100) {
                contentArray.push(svg);
            }

            this.input.forEach(v => v.getNextPosition());
        }

        return contentArray.map(i => `<p>${i.time}</p>${i.svg}`).join();
    }

    public solve2(): string {
        return this.solve1();
    }

    private createSvg(time: number): { width: number; height: number; time: number; svg: string } {
        const allX = this.input.map(i => i.position.x);
        const minX = Math.min(...allX);
        const maxX = Math.max(...allX);
        const allY = this.input.map(i => i.position.y);
        const minY = Math.min(...allY);
        const maxY = Math.max(...allY);
        const innerWidth = maxX - minX + 1;
        const innerHeight = maxY - minY + 1;
        const xPad = Math.ceil(innerWidth * 0.1);
        const yPad = Math.ceil(innerHeight * 0.1);
        const pad = Math.max(xPad, yPad);
        const width = innerWidth + 2 * pad;
        const height = innerHeight + 2 * pad;
        const xOffset = 0 - minX + pad;
        const yOffset = 0 - minY + pad;

        let content = `<rect width="${width}" height="${height}" style="fill: white" />`;

        this.input.forEach(v => {
            content += `<rect width="1" height="1" x="${v.position.x + xOffset}" y="${v.position.y +
                yOffset}" style="fill: red" />`;
        });

        return {
            width: width,
            height: height,
            time: time,
            svg: `<svg width="${width}" height="${height}">${content}</svg>`
        };
    }

    private parseVector(input: string): Vector {
        const regex = /<[ ]*([ -]\d+), [ ]*([ -]\d+)> velocity=<[ ]*([ -]\d+), [ ]*([ -]\d+)>/gi;
        const match = regex.exec(input);

        if (!match || match.length !== 5) {
            throw new Error(`Invalid input '${input}'`);
        }

        return new Vector(
            new Point(parseInt(match[1], 10), parseInt(match[2], 10)),
            new Point(parseInt(match[3], 10), parseInt(match[4], 10))
        );
    }
}

export class Point {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Vector {
    public position: Point;
    public velocity: Point;

    constructor(position: Point, velocity: Point) {
        this.position = position;
        this.velocity = velocity;
    }

    public getNextPosition(): Point {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        return this.position;
    }
}
