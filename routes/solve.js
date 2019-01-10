const express = require('express');
const router = express.Router();
const level1 = require('../levels/level1');
const level2 = require('../levels/level2');

router.get('/:level', function (req, res) {
    const level = req.params.level;
    let solution1 = 'Not solved';
    let solution2 = 'Not solved';

    switch (level) {
        case '01':
            solution1 = level1.solve1();
            solution2 = level1.solve2();
            break;
        case '02':
            solution1 = level2.solve1();
            solution2 = level2.solve2();
            break;
        default:
            break;
    }

    res.render('solution', { lvl: level, solution1: solution1, solution2: solution2 });
});

module.exports = router;