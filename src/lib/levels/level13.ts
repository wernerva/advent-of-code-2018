import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';
import { Coordinate } from './level11';

export class Level13 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day13.txt');
    }

    public solve1(): string {
        const map = new Map(this.input);

        while (map.collisions.length === 0) {
            map.tick();
        }

        return map.collisions[0].toString();
    }

    public solve2(): string {
        const map = new Map(this.input);

        try {
            while (map.carts.length > 1) {
                map.tick();
            }
        } catch (e) {
            throw new Error(`tick ${map.ticks}: ${e}`);
        }

        return map.carts[0].coordinate.toString();
    }
}

export enum Direction {
    north = 0,
    east = 1,
    south = 2,
    west = 3
}

export enum Action {
    turnLeft = -1,
    goStraight = 0,
    turnRight = 1
}

export class Cart {
    public direction: Direction;
    public coordinate: Coordinate;
    public nextAction: Action;
    public collided: boolean;

    constructor(coordinate: Coordinate, direction: Direction) {
        this.direction = direction;
        this.coordinate = coordinate;
        this.nextAction = Action.turnLeft;
        this.collided = false;
    }

    public static parseCart(char: string, coordinate: Coordinate): Cart {
        let direction: Direction;

        switch (char) {
            case '^':
                direction = Direction.north;
                break;
            case '>':
                direction = Direction.east;
                break;
            case 'V':
            case 'v':
                direction = Direction.south;
                break;
            case '<':
                direction = Direction.west;
                break;
            default:
                throw new Error(`Invalid cart character ${char}`);
        }

        return new Cart(coordinate, direction);
    }

    public move() {
        switch (this.direction) {
            case Direction.north:
                this.coordinate.y--;
                break;
            case Direction.east:
                this.coordinate.x++;
                break;
            case Direction.south:
                this.coordinate.y++;
                break;
            case Direction.west:
                this.coordinate.x--;
                break;
            default:
                throw new Error(`Unknown Direction '${this.direction}'`);
        }
    }

    public changeDirection() {
        const directionAsInt: number = (this.direction + this.nextAction) % 4;
        this.direction = directionAsInt === -1 ? 3 : directionAsInt;
        this.nextAction = ((this.nextAction + 2) % 3) - 1;
    }
}

export class Map {
    private readonly _cartRegex = /[v><^]/;
    private readonly _mapPartRegex = /[-|/\\+ ]/;
    private readonly _mapChars: string[][];
    private _carts: Cart[];
    private _ticks: number;
    private readonly _collisions: Coordinate[];

    constructor(stringArr: string[]) {
        this._mapChars = [];
        this._carts = [];
        this._ticks = 0;
        this._collisions = [];
        this.parseMap(stringArr);
    }

    public get mapChars(): string[][] {
        return this._mapChars;
    }

    public get carts(): Cart[] {
        return this._carts;
    }

    public get collisions(): Coordinate[] {
        return this._collisions;
    }

    public get ticks(): number {
        return this._ticks;
    }

    public tick(): void {
        let cart: Cart;
        let mapChar: string;

        this._ticks++;

        for (let i = 0, c = this._carts.length; i < c; i++) {
            cart = this._carts[i];

            cart.move();

            if (this.collisionCheck(cart)) {
                this._collisions.push(cart.coordinate);

                continue;
            }

            mapChar = this._mapChars[cart.coordinate.y][cart.coordinate.x];

            switch (mapChar) {
                case '\\':
                    switch (cart.direction) {
                        case Direction.north:
                            cart.direction = Direction.west;
                            break;
                        case Direction.east:
                            cart.direction = Direction.south;
                            break;
                        case Direction.south:
                            cart.direction = Direction.east;
                            break;
                        case Direction.west:
                            cart.direction = Direction.north;
                            break;
                    }
                    break;
                case '/':
                    switch (cart.direction) {
                        case Direction.north:
                            cart.direction = Direction.east;
                            break;
                        case Direction.east:
                            cart.direction = Direction.north;
                            break;
                        case Direction.south:
                            cart.direction = Direction.west;
                            break;
                        case Direction.west:
                            cart.direction = Direction.south;
                            break;
                    }
                    break;
                case '+':
                    cart.changeDirection();
            }
        }

        this._carts = this._carts.filter(c => !c.collided);

        this._carts.sort((a: Cart, b: Cart) => a.coordinate.x - b.coordinate.x || a.coordinate.y - b.coordinate.y);
    }

    private parseMap(stringArr: string[]): void {
        let xArr: string[] = [];
        let char = '';
        let isCart = false;
        let isMapPart = false;
        let cart: Cart;

        if (!stringArr) {
            throw new Error('Invalid map');
        }

        for (let y = 0, yl = stringArr.length; y < yl; y++) {
            this._mapChars[y] = [];
            xArr = [...stringArr[y]];

            for (let x = 0, xl = xArr.length; x < xl; x++) {
                char = xArr[x];
                isCart = this._cartRegex.test(char);
                isMapPart = this._mapPartRegex.test(char);

                if (!isCart && !isMapPart) {
                    throw new Error(`Unknown map character '${char}'`);
                }

                if (isCart) {
                    cart = Cart.parseCart(char, new Coordinate(x, y));

                    this._carts.push(cart);

                    switch (cart.direction) {
                        case Direction.north:
                        case Direction.south:
                            char = '|';
                            break;
                        default:
                            char = '-';
                    }
                }

                this._mapChars[y][x] = char;
            }
        }
    }

    private collisionCheck(cart: Cart): boolean {
        let c: Cart;

        for (let i = 0, l = this._carts.length; i < l; i++) {
            c = this._carts[i];

            if (cart === c) {
                continue;
            }

            if (c.coordinate.x === cart.coordinate.x && c.coordinate.y === cart.coordinate.y) {
                cart.collided = true;
                c.collided = true;
                return true;
            }
        }

        return false;
    }
}
