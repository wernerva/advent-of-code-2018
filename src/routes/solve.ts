import { BaseRoute } from './baseRoute';
import { NextFunction, Request, Response, Router } from 'express';
import { ILevel } from '../lib/levels/iLevel';
import { Level1 } from '../lib/levels/level1';
import { Level2 } from '../lib/levels/level2';
import { Level3 } from '../lib/levels/level3';

export class SolveRoute extends BaseRoute {
    public static create(router: Router) {
        console.log('Create solve route');

        router.get(
            '/solve/:level/:subLevel',
            (req: Request, res: Response, next: NextFunction) => {
                new SolveRoute().index(req, res, next);
            }
        );
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        let level = parseInt(req.params.level, 10);
        let subLevel = parseInt(req.params.subLevel, 10);
        let solution = 'Not solved';
        let lvlClass: ILevel;

        if (Number.isNaN(level)) {
            level = 1;
        }

        if (Number.isNaN(subLevel)) {
            subLevel = 1;
        }

        switch (level) {
            case 1:
                lvlClass = new Level1();
                break;
            case 2:
                lvlClass = new Level2();
                break;
            case 3:
                lvlClass = new Level3();
                break;
            default:
                lvlClass = <ILevel>{
                    solve1(): string {
                        return solution;
                    },
                    solve2(): string {
                        return solution;
                    }
                };
                break;
        }

        if (lvlClass) {
            solution = subLevel === 2 ? lvlClass.solve2() : lvlClass.solve1();
        }

        res.render('solution', {
            lvl: level,
            subLvl: subLevel,
            solution: solution
        });
    }
}
