'use strict';

import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level6 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day6.txt');
    }

    public solve1() {
        const coordArr: Coord[] = this.input.map(i => Coord.parse(i));
        const xValues = coordArr.map(i => i.x);
        const maxX = Math.max(...xValues);
        const yValues = coordArr.map(i => i.y);
        const maxY = Math.max(...yValues);
        const map: Coord[][] = [];
        const boundaryDict: { [id: string]: boolean } = {};
        const areaDict: { [id: string]: number } = {};
        let largestArea = 0;
        let mapSvg: string;

        coordArr.sort((a, b) => {
            return a.x - b.x || a.y - b.y;
        });

        for (let x = 0; x <= maxX; x++) {
            map[x] = [];
            for (let y = 0; y <= maxY; y++) {
                const c = new Coord(x, y);
                const closest = c.getClosestCoords(coordArr);
                let closestStr;

                if (closest.length !== 1) {
                    continue;
                }

                closestStr = closest.toString();

                map[x][y] = closest[0];

                if (x === 0 || x === maxX || y === 0 || y === maxY) {
                    boundaryDict[closestStr] = true;
                }

                if (boundaryDict[closestStr]) {
                    continue;
                }

                if (!areaDict[closestStr]) {
                    areaDict[closestStr] = 1;
                } else {
                    areaDict[closestStr]++;
                }
            }
        }

        for (const key in areaDict) {
            if (areaDict[key] && areaDict[key] > largestArea) {
                largestArea = areaDict[key];
            }
        }

        mapSvg = this.createNearestCoordMap(map, coordArr, 3);

        return `Largest area: ${largestArea}<br /><br />${mapSvg}`;
    }

    public solve2() {
        const coordArr: Coord[] = this.input.map(i => Coord.parse(i));
        const xValues = coordArr.map(i => i.x);
        const maxX = Math.max(...xValues);
        const minX = Math.min(...xValues);
        const yValues = coordArr.map(i => i.y);
        const maxY = Math.max(...yValues);
        const minY = Math.min(...yValues);
        const regionCoords: Coord[] = [];
        let area = 0;
        let coord: Coord;
        let dist: number;
        let svg: string;

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                coord = new Coord(x, y);
                dist = 0;

                coordArr.forEach(c => {
                    dist += Coord.calculateManhattanDistance(coord, c);
                });

                if (dist < 10000) {
                    area++;
                    regionCoords.push(coord);
                }
            }
        }

        svg = this.createRegionWithinRangeMap(coordArr, regionCoords, minX, minY, maxX - minX, maxY - minY, 3);

        return `Size of region: ${area}<br /><br />${svg}`;
    }

    private createNearestCoordMap(map: Coord[][], significantCoords: Coord[], magnification: number): string {
        const colours = ColourHelper.CreateColours(significantCoords.length);
        const colourDict: { [id: string]: string } = {};

        significantCoords.forEach((e, i) => (colourDict[e.toString()] = colours[i]));

        let mapSvg = `<rect width="${map.length * magnification}"
                                height="${map[0].length * magnification}"
                                style="fill: hsl(0, 0%, 66%)" />`;
        let legendSvg = '';
        let idx = 0;

        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[0].length; y++) {
                const c = map[x][y];
                let fill = '';

                if (!c) {
                    continue;
                }

                if (significantCoords.some(i => i.x === x && i.y === y)) {
                    fill = 'fill: black;';
                } else {
                    fill = `fill: ${colourDict[c.toString()]};`;
                }

                mapSvg +=
                    `<rect width="${magnification}" ` +
                    `height="${magnification}" ` +
                    `x="${x * magnification}" ` +
                    `y="${y * magnification}" ` +
                    `style="${fill}"/>`;
            }
        }

        mapSvg = `<svg width="${(map.length + 1) * magnification}"
                     height="${(map[0].length + 1) * magnification}">${mapSvg}</svg>`;

        for (const key in colours) {
            if (colours[key]) {
                legendSvg += `<rect width="10" height="10" x="${idx * 10}" y="0" style="fill: ${colours[key]}"/>`;
                idx++;
            }
        }

        legendSvg = `<svg width="${10 * idx}" height="${10}">${legendSvg}</svg>`;

        return `${mapSvg}<br /><br />${legendSvg}`;
    }

    private createRegionWithinRangeMap(
        pointCoords: Coord[],
        regionCoords: Coord[],
        xOffSet: number,
        yOffset: number,
        width: number,
        height: number,
        magnification: number
    ): string {
        const mapWidth = (width + 1) * magnification;
        const mapHeight = (height + 1) * magnification;
        let svg = `<rect width="${mapWidth}" height="${mapHeight}" style="fill: rgb(125, 125, 125)"/>`;

        regionCoords.forEach(c => {
            svg +=
                '<rect ' +
                `width="${magnification}" ` +
                `height="${magnification}" ` +
                `x="${(c.x - xOffSet) * magnification}" ` +
                `y="${(c.y - yOffset) * magnification}" ` +
                `style="fill: limegreen"` +
                '/>';
        });

        pointCoords.forEach(c => {
            svg +=
                '<rect ' +
                `width="${magnification}" ` +
                `height="${magnification}" ` +
                `x="${(c.x - xOffSet) * magnification}" ` +
                `y="${(c.y - yOffset) * magnification}" ` +
                `style="fill: red"` +
                '/>';
        });

        return `<svg  width="${mapWidth}" height="${mapHeight}">${svg}</svg>`;
    }
}

export class Coord {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public static parse(input: string): Coord {
        const arr = input.split(', ');

        return new Coord(parseInt(arr[0], 10), parseInt(arr[1], 10));
    }

    public static calculateManhattanDistance(a: Coord, b: Coord) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    public getClosestCoords(coordsToCheck: Coord[]): Coord[] {
        const coordDistances: { coord: Coord; distance: number }[] = [];

        for (let i = 0; i < coordsToCheck.length; i++) {
            coordDistances.push({
                coord: coordsToCheck[i],
                distance: Coord.calculateManhattanDistance(this, coordsToCheck[i])
            });
        }

        if (coordDistances.length < 2) {
            return coordDistances.map(i => i.coord);
        }

        coordDistances.sort((a, b) => (a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0));

        return coordDistances.filter(i => i.distance === coordDistances[0].distance).map(i => i.coord);
    }

    public toString(): string {
        return `${this.x}, ${this.y}`;
    }
}

export class ColourHelper {
    public static CreateColours(count: number): string[] {
        const colours: string[] = [];
        const step = Math.floor(360 / count);
        let i = 0;

        while (colours.length < count) {
            const l = 25 + Math.floor(Math.random() * 50 + 1);
            const colour = `hsl(${i * step}, 100%, ${l}%)`;

            if (colours.indexOf(colour) === -1) {
                colours.push(colour);
                i++;
            }
        }

        return colours;
    }
}
