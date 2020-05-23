const Path = require('path');

module.exports = (allMiddleware,middlewareBase)=>{
    let array = [];

    allMiddleware.forEach((middleware)=>{
        if (middleware){
            let path = `.${Path.join('/',middlewareBase,middleware)}`;
            let arrayOfInitMiddlewares = require.main.require(path);
            array.push(arrayOfInitMiddlewares())
        }
    });

    return array;
}