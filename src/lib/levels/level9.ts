import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level9 extends LevelBase implements ILevel {
    public readonly input: string[];

    constructor() {
        super();

        this.input = super.readInput('../input/day9.txt');

        // this.input = [
        //     '9 players; last marble is worth 25 points',
        //     '10 players; last marble is worth 1618 points',
        //     '13 players; last marble is worth 7999 points',
        //     '17 players; last marble is worth 1104 points',
        //     '21 players; last marble is worth 6111 points',
        //     '30 players; last marble is worth 5807 points'
        // ];
    }

    public solve1(): string {
        return this.playGame();
    }

    public solve2(): string {
        return this.playGame(100);
    }

    private playGame(roundMultiplier: number = 1): string {
        let circle: Circle; // = new Circle(9);
        let winner: { player: number; score: number }; // = circle.play(25);

        let results = '';

        this.input.forEach(i => {
            const regex = /^(\d+) players; last marble is worth (\d+)/gi;
            const matches = regex.exec(i);
            let players: number;
            let rounds: number;

            if (!matches || matches.length !== 3) {
                return;
            }

            players = parseInt(matches[1], 10);
            rounds = parseInt(matches[2], 10) * roundMultiplier;

            circle = new Circle(players);
            winner = circle.play(rounds);

            results += `${i}. Winner: player ${winner.player}, score ${winner.score}<br />`;
        });

        return results;
    }
}

export class Marble {
    private readonly _number: number;

    public previousMarble: Marble;
    public nextMarble: Marble;

    constructor(number: number) {
        this._number = number;
        this.previousMarble = this;
        this.nextMarble = this;
    }

    public get number(): number {
        return this._number;
    }
}

export class Circle {
    private readonly _players: number[];
    private _zeroMarble = new Marble(0);
    private _currentMarble: Marble;

    constructor(players: number) {
        this._players = new Array(players).fill(0);
        this._currentMarble = this._zeroMarble;
        this._currentMarble.nextMarble = this._currentMarble;
        this._currentMarble.previousMarble = this._currentMarble;
    }

    public play(rounds: number): { player: number; score: number } {
        const playerCount = this._players.length;
        let playerIdx = 0;
        let tempMarble: Marble;

        for (let r = 1; r <= rounds; r++) {
            if (r % 23 === 0) {
                playerIdx = (r % playerCount) - 1;
                tempMarble = this.getMarble(-7);
                this._players[playerIdx] += r + tempMarble.number;

                tempMarble.previousMarble.nextMarble = tempMarble.nextMarble;
                tempMarble.nextMarble.previousMarble = tempMarble.previousMarble;

                this._currentMarble = tempMarble.nextMarble;
            } else {
                tempMarble = new Marble(r);

                tempMarble.previousMarble = this.getMarble(1);
                tempMarble.nextMarble = this.getMarble(2);
                tempMarble.previousMarble.nextMarble = tempMarble;
                tempMarble.nextMarble.previousMarble = tempMarble;

                this._currentMarble = tempMarble;
            }
        }

        return this.getWinner();
    }

    private getMarble(relativePosition: number): Marble {
        const moveForward = relativePosition > 0;
        const moves = Math.abs(relativePosition);
        let marble: Marble = this._currentMarble;

        if (relativePosition === 0) {
            return this._currentMarble;
        }

        for (let i = 0; i < moves; i++) {
            marble = moveForward ? marble.nextMarble : marble.previousMarble;
        }

        return marble;
    }

    private getWinner(): { player: number; score: number } {
        let topScore = 0;
        let player = 1;

        this._players.forEach((e, i) => {
            if (e > topScore) {
                topScore = e;
                player = i + 1;
            }
        });

        return { player: player, score: topScore };
    }
}
