import { ILevel } from './iLevel';
import { LevelBase } from './levelBase';

export class Level14 extends LevelBase implements ILevel {
    public readonly input: number;

    constructor() {
        super();

        this.input = parseInt(super.readInput('../input/day14.txt')[0], 10);
    }

    public solve1(): string {
        const gen = new RecipeGenerator([3, 7], 2);

        return gen.getScore(this.input, 10);
    }

    public solve2(): string {
        const recipesToMatch = this.input.toString();
        const gen = new RecipeGenerator([3, 7], 2);

        return gen.getRecipeCountBeforePattern(recipesToMatch).toString();
    }
}

export class RecipeGenerator {
    public recipes: number[] = [];
    public elves: number[] = [];

    constructor(initialRecipies: number[], numberOfElves: number) {
        this.recipes = initialRecipies;

        for (let i = 0; i < numberOfElves; i++) {
            this.elves.push(i);
        }
    }

    public play(): number[] {
        const newRecipes = this.CreateNewRecipes();

        newRecipes.forEach(i => this.recipes.push(i));

        this.assignNewRecipesToElves();

        return newRecipes;
    }

    public getScore(numberOfPreviousRecipes: number, scoreLength: number) {
        let initialRecipes: string;

        while (this.recipes.length < numberOfPreviousRecipes) {
            this.play();
        }

        initialRecipes = this.recipes.join('').substr(0, numberOfPreviousRecipes);

        while (this.recipes.length < numberOfPreviousRecipes + 10) {
            this.play();
        }

        return this.recipes.join('').substr(initialRecipes.length, 10);
    }

    public getRecipeCountBeforePattern(pattern: string) {
        let tempString = this.recipes.join('');
        let length = this.recipes.length;
        let index = -1;

        while (index < 0) {
            tempString += this.play().join('');
            length = this.recipes.length;

            if (tempString.length < pattern.length) {
                continue;
            }

            index = tempString.indexOf(pattern);

            if (index > -1) {
                index = length - tempString.length + index;
                break;
            }

            if (tempString.length > pattern.length) {
                tempString = tempString.substr(0 - pattern.length);
            }
        }

        return index;
    }

    private CreateNewRecipes(): number[] {
        let sum = 0;

        this.elves.forEach(e => (sum += this.recipes[e]));

        return [...sum.toString()].map(i => parseInt(i, 10));
    }

    private assignNewRecipesToElves() {
        let idx: number;
        let recipe: number;

        for (let i = 0, l = this.elves.length; i < l; i++) {
            idx = this.elves[i];
            recipe = this.recipes[idx];

            this.elves[i] = (idx + 1 + recipe) % this.recipes.length;
        }
    }
}
