import { RecipeGenerator } from '../../src/lib/levels';
import { assert } from 'chai';


describe('RecipeGenerator', () => {
    describe('constructor', () => {
        it('should initialize RecipeGenerator with passed in recipes and number of elves', () => {
            const input: number[] = [3, 7];
            const rg = new RecipeGenerator(input, 2);

            assert.equal(rg.recipes.length, 2);
            assert.equal(rg.recipes[0], 3);
            assert.equal(rg.recipes[1], 7);
            assert.equal(rg.elves.length, 2);
        });

        it('should assign recipes to elves', () => {
            const input: number[] = [3, 7];
            const rg = new RecipeGenerator(input, 2);

            assert.equal(rg.elves[0], 0);
            assert.equal(rg.elves[1], 1);
        });
    });

    describe('play', () => {
        it('should add new recipes', () => {
            const input: number[] = [3, 7];
            const rg = new RecipeGenerator(input, 2);
            const expected = [3, 7, 1, 0];
            rg.play();

            assert.equal(rg.recipes.length, 4);
            assert.isTrue(rg.recipes.every((v, i) => v === expected[i]));
        });

        it('should assign new recipe indexes to elves', () => {
            const input: number[] = [3, 7];
            const rg = new RecipeGenerator(input, 2);
            const expected = [3, 7, 1, 0, 1, 0];
            rg.play();

            assert.equal(rg.recipes.length, 4);
            assert.isTrue(rg.recipes.every((v, i) => v === expected[i]));
            assert.equal(rg.elves[0], 0);
            assert.equal(rg.elves[1], 1);

            rg.play();

            assert.equal(rg.recipes.length, 6);
            assert.isTrue(rg.recipes.every((v, i) => v === expected[i]));
            assert.equal(rg.elves[0], 4);
            assert.equal(rg.elves[1], 3);
        });

        it('should result in [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2] after 15 rounds', () => {
            const input: number[] = [3, 7];
            const rg = new RecipeGenerator(input, 2);
            const expected = [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2];

            for (let i = 0; i < 15; i++) {
                rg.play();
            }

            assert.equal(rg.recipes.length, expected.length);
            assert.isTrue(rg.recipes.every((v, i) => v === expected[i]));
            assert.equal(rg.elves[0], 8);
            assert.equal(rg.elves[1], 4);
        });
    });
});
