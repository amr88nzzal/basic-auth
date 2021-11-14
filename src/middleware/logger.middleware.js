"use strict";

function logger(req, res, next){
    console.log(`================================\nRequest: ${req.method}/${req.path}\n================================`);

    next();
};


module.exports= logger;