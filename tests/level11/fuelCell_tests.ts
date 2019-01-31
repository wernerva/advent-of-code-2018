import { FuelCell } from '../../src/lib/levels';
import { assert } from 'chai';

describe('FuelCell', () => {
    describe('Coordinate', () => {
        it('Coordinate should equal the x and y values passed into constructor', () => {
            const fc = new FuelCell(5, 3, 123);

            assert.equal(fc.coordinate.x, 5);
            assert.equal(fc.coordinate.y, 3);
        });
    });

    describe('Power Level', () => {
        it('Power level return power level calculated according to coordinates and rack serial number', () => {
            let fc = new FuelCell(3, 5, 8);

            assert.equal(fc.powerLevel, 4);

            fc = new FuelCell(122, 79, 57);

            assert.equal(fc.powerLevel, -5);

            fc = new FuelCell(217, 196, 39);

            assert.equal(fc.powerLevel, 0);

            fc = new FuelCell(101, 153, 71);

            assert.equal(fc.powerLevel, 4);
        });
    });
});
