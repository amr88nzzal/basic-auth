'use strict';
let err404 = (req, res, next) => {
    res.status(404).json(
        {
            error: '404',
            message: 'Page Not Found'
        });
    next();
}
module.exports = err404