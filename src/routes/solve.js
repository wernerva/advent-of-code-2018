"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("./baseRoute");
const level1_1 = require("../lib/levels/level1");
const level2_1 = require("../lib/levels/level2");
const level3_1 = require("../lib/levels/level3");
class SolveRoute extends baseRoute_1.BaseRoute {
    static create(router) {
        router.get('/:level/:subLevel', (req, res, next) => {
            new SolveRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        let level = parseInt(req.params.level, 10);
        let subLevel = parseInt(req.params.subLevel, 10);
        let solution = 'Not solved';
        let lvlClass;
        if (Number.isNaN(level)) {
            level = 1;
        }
        if (Number.isNaN(subLevel)) {
            subLevel = 1;
        }
        switch (level) {
            case 1:
                lvlClass = new level1_1.Level1();
                break;
            case 2:
                lvlClass = new level2_1.Level2();
                break;
            case 3:
                lvlClass = new level3_1.Level3();
                break;
            default:
                lvlClass = {
                    solve1() {
                        return solution;
                    },
                    solve2() {
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
exports.SolveRoute = SolveRoute;
//# sourceMappingURL=solve.js.map