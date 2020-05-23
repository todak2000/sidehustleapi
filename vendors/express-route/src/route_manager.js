const routeTunnel = require("./routeTunnel");

module.exports = (app,routesRegister,options)=>{

    for(let index in routesRegister){
        if (routesRegister.hasOwnProperty(index)){
            routeTunnel(app,routesRegister[index],index,[],options);
        }else{
            throw 'object expected only';
        }

    }

}