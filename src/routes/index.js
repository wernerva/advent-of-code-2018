"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("./baseRoute");
class IndexRoute extends baseRoute_1.BaseRoute {
    static create(router) {
        router.get('/', (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.render(req, res, 'index');
    }
}
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map