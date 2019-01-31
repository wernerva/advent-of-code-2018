import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level11 extends LevelBase implements ILevel {
    public readonly input: number;

    constructor() {
        super();

        this.input = super.readInput('../input/day11.txt').map(i => parseInt(i, 10))[0];
    }

    public solve1(): string {
        const powerGrid = new PowerGrid(300, 300, this.input);
        const maxPowerBlock = powerGrid.getMaxPowerBlock(3, 3);

        return maxPowerBlock.topLeftCoordinate.toString();
    }

    public solve2(): string {
        const powerGrid = new PowerGrid(300, 300, this.input);
        let maxPowerBlock: { topLeftCoordinate: Coordinate; power: number } = {
            topLeftCoordinate: new Coordinate(0, 0),
            power: 0
        };
        let powerBlock: { topLeftCoordinate: Coordinate; power: number };
        let blockSize = 1;

        for (let i = 1; i < 301; i++) {
            powerBlock = powerGrid.getMaxPowerBlock(i, i);

            if (powerBlock.power > maxPowerBlock.power) {
                maxPowerBlock = powerBlock;
                blockSize = i;
            }
        }

        return `${maxPowerBlock.topLeftCoordinate.toString()},${blockSize}`;
    }
}

export class Coordinate {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return `${this.x},${this.y}`;
    }
}

export class FuelCell {
    private readonly _coordinate: Coordinate;
    private readonly _rackId: number;
    private readonly _powerLevel: number;

    constructor(x: number, y: number, rackSerialNumber: number) {
        this._coordinate = new Coordinate(x, y);
        this._rackId = x + 10;

        this._powerLevel = this._rackId * y;
        this._powerLevel += rackSerialNumber;
        this._powerLevel *= this._rackId;
        this._powerLevel = parseInt(this._powerLevel.toString().substr(-3, 1) || '0', 10);
        this._powerLevel -= 5;
    }

    public get rackId(): number {
        return this._rackId;
    }

    public get coordinate(): Coordinate {
        return this._coordinate;
    }

    public get powerLevel(): number {
        return this._powerLevel;
    }
}

export class PowerGrid {
    private readonly _xDimension: number;
    private readonly _yDimension: number;
    private readonly _fuelCells: FuelCell[][];
    private readonly _serialNumber: number;

    constructor(xDimension: number, yDimension: number, serialNumber: number) {
        this._xDimension = xDimension;
        this._yDimension = yDimension;
        this._serialNumber = serialNumber;
        this._fuelCells = new Array<FuelCell[]>(this._xDimension).fill(new Array<FuelCell>());

        this.populateGrid();
    }

    public get xDimension(): number {
        return this._xDimension;
    }

    public get yDimension(): number {
        return this._yDimension;
    }

    public get serialNumber(): number {
        return this._serialNumber;
    }

    public calculatePowerTotalOfBlock(topLeftCoordinate: Coordinate, blockWidth: number, blockHeight: number): number {
        let power = 0;
        let xIdx: number;
        let yIdx: number;

        for (let i = 0; i < blockWidth; i++) {
            xIdx = topLeftCoordinate.x + i;

            if (xIdx > this._xDimension) {
                break;
            }

            for (let j = 0; j < blockHeight; j++) {
                yIdx = topLeftCoordinate.y + j;

                if (yIdx > this._yDimension) {
                    break;
                }

                power += this._fuelCells[topLeftCoordinate.x + i][topLeftCoordinate.y + j].powerLevel;
            }
        }

        return power;
    }

    public getMaxPowerBlock(blockWidth: number, blockHeight: number): { topLeftCoordinate: Coordinate; power: number } {
        const xLimit = this._xDimension - blockWidth + 1;
        const yLimit = this._yDimension - blockHeight + 1;
        let maxPowerCoordinate: Coordinate = new Coordinate(0, 0);
        let blockPower = 0;
        let maxPower = 0;

        for (let x = 0; x < xLimit; x++) {
            for (let y = 0; y < yLimit - 2; y++) {
                blockPower = this.calculatePowerTotalOfBlock(new Coordinate(x, y), blockWidth, blockHeight);

                if (maxPower < blockPower) {
                    maxPower = blockPower;
                    maxPowerCoordinate = this._fuelCells[x][y].coordinate;
                }
            }
        }

        return { topLeftCoordinate: maxPowerCoordinate, power: maxPower };
    }

    private populateGrid(): void {
        for (let x = 0; x < this._xDimension; x++) {
            this._fuelCells[x] = [];

            for (let y = 0; y < this._yDimension; y++) {
                this._fuelCells[x][y] = new FuelCell(x, y, this._serialNumber);
            }
        }
    }
}
