const routeManager = require('./src/route_manager');
const Path         = require('path');

module.exports = function (app,{routeFile,middlewareDirectory,controllerDirectory}) {
    let something = `.${Path.join('/',routeFile)}`
    try{
        let routeRegister = require.main.require(something);
        routeManager(app,routeRegister,{controllerDirectory,middlewareDirectory});
    }catch (e) {
        throw e;
    }
};