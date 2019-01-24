import { BaseRoute } from './baseRoute';
import { NextFunction, Request, Response, Router } from 'express';
import { ILevel, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8 } from '../lib/levels/';

export class SolveRoute extends BaseRoute {
    public static create(router: Router) {
        router.get('/solve/:level/:subLevel', (req: Request, res: Response, next: NextFunction) => {
            new SolveRoute().index(req, res, next);
        });
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
            case 4:
                lvlClass = new Level4();
                break;
            case 5:
                lvlClass = new Level5();
                break;
            case 6:
                lvlClass = new Level6();
                break;
            case 7:
                lvlClass = new Level7();
                break;
            case 8:
                lvlClass = new Level8();
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

        if (next) {
            next();
        }
    }
}
