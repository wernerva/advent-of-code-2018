import { BaseRoute } from './baseRoute';
import { NextFunction, Request, Response, Router } from 'express';
import {
    ILevel,
    Level1,
    Level10,
    Level11,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    Level8,
    Level9
} from '../lib/levels/';

export class SolveRoute extends BaseRoute {
    public static create(router: Router) {
        router.get('/solve/:day([1-9]|1[0-9]|2[0-5])/:part(1|2)', (req: Request, res: Response, next: NextFunction) => {
            new SolveRoute().index(req, res, next);
        });
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        const day = parseInt(req.params.day, 10);
        const part = parseInt(req.params.part, 10);
        let solution = 'Not solved';
        let lvlClass: ILevel;
        let levelFound = true;

        switch (day) {
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
            case 9:
                lvlClass = new Level9();
                break;
            case 10:
                lvlClass = new Level10();
                break;
            case 11:
                lvlClass = new Level11();
                break;
            default:
                levelFound = false;
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

        if (levelFound) {
            solution = part === 2 ? lvlClass.solve2() : lvlClass.solve1();

            res.render('solution', {
                day: day,
                part: part,
                solution: solution
            });
        } else {
            res.render('not-done');
        }

        if (next) {
            next();
        }
    }
}
