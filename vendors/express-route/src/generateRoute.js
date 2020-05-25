const middleWareKernel = require('./middleWareKernel');
const nodePath             = require('path');

module.exports = (app,url,routeObject,oldMiddlewares=[],opt)=>{

    let {verb,controller,middlewares}       =   routeObject;
    let requireController;
    if (typeof controller === "function"){
         requireController  = controller;
    }else{

        let {path,method}                       =   controller;
        if(!path){
             throw new Error("path is not defined");
        }
        let integratedPath = `.${nodePath.join('/',opt.controllerDirectory,path)}`;
        requireController = require.main.require(integratedPath);


        //if method is set then it is either an object or a static function
        if (method){
            if (typeof requireController === 'function' ){


                if (requireController[method]){
                    requireController = requireController[method]
                }else{
                    try {
                        let instantiateController    =   new requireController();
                        requireController = instantiateController[method];

                        if (requireController === undefined){

                            console.warn(`No method was found for path:${url}`)

                        }

                    }catch (e) {

                    }
                }

            }else if (typeof requireController === 'object'){
                requireController = requireController[method]
                if (requireController === undefined){
                    console.warn(`No method was found for path:${url}`)
                }

            }
        }

    }




    app[verb||"get"]('/'+url,middleWareKernel(oldMiddlewares.concat(middlewares||[]),opt.middlewareDirectory),(req,res)=>{
        requireController(req,res)
    });

};