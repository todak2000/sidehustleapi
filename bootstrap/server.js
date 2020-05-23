const express      	= require('express');
const app           = express();
var cors            = require('cors');
const Path          = require('path');
const expressRouter        = require('../vendors/express-route');

const {routesRegister,postBoot}      = require('../config/kernel');
//Initialize Database Config
// require('../config/database');



module.exports = class server{

  postBoot() {
    postBoot.forEach((toBoot)=>{
      let file = require(`../config/postBoot/${toBoot}`);
      file();
    })
  }

  generateRoute(url,routeObject,oldMiddlewares=[]){

    let {verb,controller,middlewares}       =   routeObject;
    let {path,method}                       =   controller;

    let requireController = require(`../app/controllers/${path}`);
    // controller = controller[method||'index'];
    controller = requireController[method];
    if (typeof controller !== "function"){
      throw `Method:${method} should be a static function`;
    }

    app[verb||"get"]('/'+url,this.middleWareKernel(oldMiddlewares.concat(middlewares||[])),(req,res)=>{
      controller(req,res)
    });

  }

  middleWareKernel(allMiddleware){

      let array = [];

      allMiddleware.forEach((middleware)=>{
          if (middleware){
            let path = Path.join('routes/middlewares',middleware);
            let arrayOfInitMiddlewares = require(`../app/${path}`);
            array.push(arrayOfInitMiddlewares())
          }
      });

      return array;
  }

  concatMiddlewares(oldMiddleWare=[],newMiddleware){

    let middlewares;
    if (typeof newMiddleware === 'string' ){



      oldMiddleWare.push(newMiddleware);
      middlewares = oldMiddleWare;
    }else if (Array.isArray(newMiddleware)){

      middlewares = oldMiddleWare.concat(newMiddleware||[]);

    }


    return middlewares;


  }

  routeTunnel(obj,routePath,middlewares=[]){

    let middleware1 = middlewares;
    //if the object pass doesn't contain a string just keep on taking it deeper
    if (typeof  obj === 'object' &&  !obj.hasOwnProperty('controller') ){



     let concMiddlewares =  this.concatMiddlewares(middleware1,obj.middlewares||[]);


      for (let prop in obj){


        //ignore middlewares as it has been taken care of previously
        if (prop !== 'middlewares'){

          if (obj.hasOwnProperty(prop)){


            let joinedPath  = Path.join(routePath,prop);
            let objMiddleware = obj[prop].middlewares||[];
            // let innerConcMiddlewares = this.concatMiddlewares(concMiddlewares,objMiddleware);
            this.routeTunnel(obj[prop],joinedPath,concMiddlewares)
          }
        }
      }

    }else if (obj.hasOwnProperty('controller')){
      this.generateRoute(routePath,obj,middlewares);
    }
  }

  routeManager(){
//routes

    for(let index in routesRegister){
      if (routesRegister.hasOwnProperty(index)){

        this.routeTunnel(routesRegister[index],index,[]);
      }else{
        throw 'object expected only';
      }

    }
  }

  start(){
    // //middlewares
    // app.use('/v1/static',express.static('storage/users'));




    expressRouter(app,{routeFile:'/app/routes/route',middlewareDirectory:'app/routes/middlewares',controllerDirectory:'app/controllers'});



    app.listen(process.env.API_PORT||'3000',(err)=>{
      console.log(`> server started on port ${process.env.API_PORT||'3000'}`);
      this.postBoot();
    });

    app.on('error',(err)=>{
      console.log(err);
      return;
    })



  }
}

