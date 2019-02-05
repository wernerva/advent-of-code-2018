import { Action, Direction, Map } from '../../src/lib/levels';
import { assert } from 'chai';

describe('Map', () => {
    const input: string[] = [
        '/->-\\        ',
        '|   |  /----\\',
        '| /-+--+-\\  |',
        '| | |  | v  |',
        '\\-+-/  \\-+--/',
        '  \\------/   '
    ];

    describe('constructor', () => {
        it('when passed valid map should populate populate mapChars property with map.', () => {
            const map = new Map(input);

            assert.isTrue(map.mapChars !== undefined);
            assert.equal(map.mapChars.length, 6);
            assert.isTrue(map.mapChars.every(i => i.length === 13));
        });

        it('when passed valid map with 2 carts, carts array should contain 2 carts.', () => {
            const map = new Map(input);

            assert.isTrue(map.carts !== undefined);
            assert.equal(map.carts.length, 2);
        });

        it('when passed valid map with carts at points [2, 0] and [9, 3], cart coordinates should be [2, 0] and [9, 3].', () => {
            const map = new Map(input);

            assert.equal(map.carts[0].coordinate.x, 2);
            assert.equal(map.carts[0].coordinate.y, 0);
            assert.equal(map.carts[1].coordinate.x, 9);
            assert.equal(map.carts[1].coordinate.y, 3);
        });
    });

    describe('tick', () => {
        it('should move all carts in their direction of travel', () => {
            const map = new Map(input);

            assert.equal(map.carts[0].coordinate.toString(), '2,0');
            assert.equal(map.carts[1].coordinate.toString(), '9,3');

            map.tick();

            assert.equal(map.carts[0].coordinate.toString(), '3,0');
            assert.equal(map.carts[1].coordinate.toString(), '9,4');
        });

        it('cart moving along horizontal path should face the same direction after moving', () => {
            const map = new Map(input);
            const directionBefore = map.carts[0].direction;

            map.tick();

            assert.equal(map.carts[0].direction, directionBefore);
        });

        it('cart moving into intersection should change direction according to its next action', () => {
            const map = new Map(input);

            assert.equal(map.carts[1].direction, Direction.south);
            assert.equal(map.carts[1].nextAction, Action.turnLeft);

            map.tick();

            assert.equal(map.carts[1].direction, Direction.east);
            assert.equal(map.carts[1].nextAction, Action.goStraight);
        });

        it('cart moving corner should change direction according to its previous direction of travel and direction of corner', () => {
            const circularInput = ['/>\\/<\\', '^ vv ^', '\\</\\>/'];

            const map = new Map(circularInput);
            const cart1 = map.carts[0];
            const cart2 = map.carts[1];
            const cart3 = map.carts[2];
            const cart4 = map.carts[3];
            const cart5 = map.carts[4];
            const cart6 = map.carts[5];
            const cart7 = map.carts[6];
            const cart8 = map.carts[7];

            map.tick();

            assert.equal(cart1.direction, Direction.south);
            assert.equal(cart2.direction, Direction.south);
            assert.equal(cart3.direction, Direction.east);
            assert.equal(cart4.direction, Direction.west);
            assert.equal(cart5.direction, Direction.east);
            assert.equal(cart6.direction, Direction.west);
            assert.equal(cart7.direction, Direction.north);
            assert.equal(cart8.direction, Direction.north);
        });

        it('collided carts should be removed', () => {
            const collisionInput = ['-->-<->--'];
            const map = new Map(collisionInput);
            const initialCartCount = map.carts.length;

            map.tick();

            assert.equal(map.carts.length, initialCartCount - 2);
        });
    });
});
