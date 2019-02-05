import { Action, Cart, Coordinate, Direction } from '../../src/lib/levels';
import { assert } from 'chai';

describe('Cart', () => {
    describe('parseCart', () => {
        it('when called with ^, cart direction is north', () => {
            const cart = Cart.parseCart('^', new Coordinate(0, 0));

            assert.equal(cart.direction, Direction.north);
        });

        it('when called with >, cart direction is east', () => {
            const cart = Cart.parseCart('>', new Coordinate(0, 0));

            assert.equal(cart.direction, Direction.east);
        });

        it('when called with v, cart direction is south', () => {
            const cart = Cart.parseCart('v', new Coordinate(0, 0));

            assert.equal(cart.direction, Direction.south);
        });

        it('when called with <, cart direction is west', () => {
            const cart = Cart.parseCart('<', new Coordinate(0, 0));

            assert.equal(cart.direction, Direction.west);
        });
    });

    describe('changeDirection', () => {
        it('when current action is turnLeft and direction is north, new direction should be west', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.turnLeft;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.west);
        });

        it('when current action is turnLeft and direction is east, new direction should be north', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.east);
            cart.nextAction = Action.turnLeft;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.north);
        });

        it('when current action is turnLeft and direction is south, new direction should be east', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.south);
            cart.nextAction = Action.turnLeft;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.east);
        });

        it('when current action is turnLeft and direction is west, new direction should be south', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.west);
            cart.nextAction = Action.turnLeft;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.south);
        });

        it('when current action is goStraight and direction is north, direction should remain the same', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.goStraight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.north);
        });

        it('when current action is goStraight and direction is east, direction should remain the same', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.east);
            cart.nextAction = Action.goStraight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.east);
        });

        it('when current action is goStraight and direction is south, direction should remain the same', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.south);
            cart.nextAction = Action.goStraight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.south);
        });

        it('when current action is goStraight and direction is west, direction should remain the same', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.west);
            cart.nextAction = Action.goStraight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.west);
        });

        it('when current action is turnRight and direction is north, new direction should be east', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.turnRight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.east);
        });

        it('when current action is turnRight and direction is east, new direction should be south', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.east);
            cart.nextAction = Action.turnRight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.south);
        });

        it('when current action is turnRight and direction is south, new direction should be west', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.south);
            cart.nextAction = Action.turnRight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.west);
        });

        it('when current action is turnRight and direction is west, new direction should be north', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.west);
            cart.nextAction = Action.turnRight;

            cart.changeDirection();

            assert.equal(cart.direction, Direction.north);
        });

        it('when current action is turnLeft, new action should be goStraight', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.turnLeft;

            cart.changeDirection();

            assert.equal(cart.nextAction, Action.goStraight);
        });

        it('when current action is goStraight, new action should be turnRight', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.goStraight;

            cart.changeDirection();

            assert.equal(cart.nextAction, Action.turnRight);
        });

        it('when current action is turnRight, new action should be turnLeft', () => {
            const cart = new Cart(new Coordinate(0, 0), Direction.north);
            cart.nextAction = Action.turnRight;

            cart.changeDirection();

            assert.equal(cart.nextAction, Action.turnLeft);
        });
    });
});
