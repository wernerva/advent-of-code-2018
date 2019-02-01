import { GameOfPlants } from '../../src/lib/levels';
import { assert } from 'chai';

describe('GameOfPlants', () => {
    describe('age()', () => {
        it('returns correct state after calling age', () => {
            const initialState = '#..#.#..##......###...###';
            const rules: string[] = [
                '....# => .',
                '...#. => .',
                '...## => #',
                '..#.. => #',
                '..#.# => .',
                '..##. => .',
                '..### => .',
                '.#... => #',
                '.#..# => .',
                '.#.#. => #',
                '.#.## => #',
                '.##.. => #',
                '.##.# => .',
                '.###. => .',
                '.#### => #',
                '#.... => .',
                '#...# => .',
                '#..#. => .',
                '#..## => .',
                '#.#.. => .',
                '#.#.# => #',
                '#.##. => .',
                '#.### => #',
                '##... => .',
                '##..# => .',
                '##.#. => #',
                '##.## => #',
                '###.. => #',
                '###.# => #',
                '####. => #',
                '##### => .',
                '..... => .'
            ];

            const gop = new GameOfPlants(initialState, rules);

            gop.age();
            assert.equal(gop.state, '#...#....#.....#..#..#..#');

            gop.age();
            assert.equal(gop.state, '##..##...##....#..#..#..##');

            gop.age();
            assert.equal(gop.state, '#.#...#..#.#....#..#..#...#');

            gop.age();
            assert.equal(gop.state, '#.#..#...#.#...#..#..##..##');

            gop.age();
            assert.equal(gop.state, '#...##...#.#..#..#...#...#');

            gop.age();
            assert.equal(gop.state, '##.#.#....#...#..##..##..##');

            gop.age();
            assert.equal(gop.state, '#..###.#...##..#...#...#...#');

            gop.age();
            assert.equal(gop.state, '#....##.#.#.#..##..##..##..##');

            gop.age();
            assert.equal(gop.state, '##..#..#####....#...#...#...#');

            gop.age();
            assert.equal(gop.state, '#.#..#...#.##....##..##..##..##');

            gop.age();
            assert.equal(gop.state, '#...##...#.#...#.#...#...#...#');

            gop.age();
            assert.equal(gop.state, '##.#.#....#.#...#.#..##..##..##');

            gop.age();
            assert.equal(gop.state, '#..###.#....#.#...#....#...#...#');

            gop.age();
            assert.equal(gop.state, '#....##.#....#.#..##...##..##..##');

            gop.age();
            assert.equal(gop.state, '##..#..#.#....#....#..#.#...#...#');

            gop.age();
            assert.equal(gop.state, '#.#..#...#.#...##...#...#.#..##..##');

            gop.age();
            assert.equal(gop.state, '#...##...#.#.#.#...##...#....#...#');

            gop.age();
            assert.equal(gop.state, '##.#.#....#####.#.#.#...##...##..##');

            gop.age();
            assert.equal(gop.state, '#..###.#..#.#.#######.#.#.#..#.#...#');

            gop.age();
            assert.equal(gop.state, '#....##....#####...#######....#.#..##');
        });
    });

    describe('score', () => {
        it('returns correct score', () => {
            const initialState = '#..#.#..##......###...###';
            const rules: string[] = [
                '....# => .',
                '...#. => .',
                '...## => #',
                '..#.. => #',
                '..#.# => .',
                '..##. => .',
                '..### => .',
                '.#... => #',
                '.#..# => .',
                '.#.#. => #',
                '.#.## => #',
                '.##.. => #',
                '.##.# => .',
                '.###. => .',
                '.#### => #',
                '#.... => .',
                '#...# => .',
                '#..#. => .',
                '#..## => .',
                '#.#.. => .',
                '#.#.# => #',
                '#.##. => .',
                '#.### => #',
                '##... => .',
                '##..# => .',
                '##.#. => #',
                '##.## => #',
                '###.. => #',
                '###.# => #',
                '####. => #',
                '##### => .',
                '..... => .'
            ];

            const gop = new GameOfPlants(initialState, rules);

            for (let i = 0; i < 20; i++) {
                gop.age();
            }

            assert.equal(gop.score, 325);
        });
    });
});
