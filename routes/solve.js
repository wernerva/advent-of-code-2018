const express = require('express');
const router = express.Router();
const level1 = require('../lib/levels/level1');
const level2 = require('../lib/levels/level2');
const level3 = require('../lib/levels/level3');

router.get('/:level/:subLevel', function(req, res) {
    const level = req.params.level;
    const subLevel = req.params.subLevel;
    let solution = 'Not solved';

    switch (level) {
        case '01':
            switch (subLevel) {
                case '2':
                    solution = level1.solve2();
                    break;
                default:
                    solution = level1.solve1();
            }
            break;
        case '02':
            switch (subLevel) {
                case '2':
                    solution = level2.solve2();
                    break;
                default:
                    solution = level2.solve1();
            }
            break;
        case '03':
            switch (subLevel) {
                case '2':
                    solution = level3.solve2();
                    break;
                default:
                    solution = level3.solve1();
            }
            break;
        default:
            break;
    }

    res.render('solution', {
        lvl: level,
        subLvl: subLevel,
        solution: solution
    });
});

module.exports = router;
