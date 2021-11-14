'use strict';
let err500 =(error, request, response, next) => {
    const error1 = error.message ? error.message : error;
    response.status(500).json({ error1 });
}
module.exports = err500