"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoute {
    render(req, res, view, options) {
        // add constants
        res.locals.BASE_URL = '/';
        // render view
        res.render(view, options);
    }
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=baseRoute.js.map