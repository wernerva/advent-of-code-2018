import { Coordinate, PowerGrid } from '../../src/lib/levels';
import { assert } from 'chai';
import { renderSync } from 'node-sass';

describe('Power Grid', () => {
    describe('calculatePowerTotalOfBlock', () => {
        it('Should return the sum of the power from the fuel cells in the specified block of the power grid', () => {
            let powerGrid = new PowerGrid(300, 300, 18);

            assert.equal(powerGrid.calculatePowerTotalOfBlock(new Coordinate(33, 45), 3, 3), 29);

            powerGrid = new PowerGrid(300, 300, 42);

            assert.equal(powerGrid.calculatePowerTotalOfBlock(new Coordinate(21, 61), 3, 3), 30);
        });
    });

    describe('getMaxPowerBlock', () => {
        it('Should return the coordinate of the top left fuel cell of the block of the power grid which has the highest total power', () => {
            let powerGrid = new PowerGrid(300, 300, 18);
            let result = powerGrid.getMaxPowerBlock(3, 3);

            assert.equal(result.topLeftCoordinate.x, 33);
            assert.equal(result.topLeftCoordinate.y, 45);
            assert.equal(result.power, 29);

            powerGrid = new PowerGrid(300, 300, 42);
            result = powerGrid.getMaxPowerBlock(3, 3);

            assert.equal(result.topLeftCoordinate.x, 21);
            assert.equal(result.topLeftCoordinate.y, 61);
            assert.equal(result.power, 30);
        });
    });
});
