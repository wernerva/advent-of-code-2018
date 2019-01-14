import { Request, Response } from 'express';

export abstract class BaseRoute {
    public render(req: Request, res: Response, view: string, options?: Object) {
        // add constants
        res.locals.BASE_URL = '/';

        // render view
        res.render(view, options);
    }
}
