import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

export class IndexRoute extends BaseRoute {
    public static create(router: Router) {
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        // this.render(req, res, 'index');
        res.render('index', { maxDay: 14 });

        if (next) {
            next();
        }
    }
}
