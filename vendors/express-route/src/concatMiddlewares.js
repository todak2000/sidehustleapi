module.exports =   (oldMiddleWare=[],newMiddleware,ignoreMiddlewares)=>{

    let middlewares;



    if (typeof newMiddleware === 'string' ){



        oldMiddleWare.push(newMiddleware);
        middlewares = oldMiddleWare;
    }else if (Array.isArray(newMiddleware)){

        middlewares = oldMiddleWare.concat(newMiddleware||[]);

    }

    //do ignore middlewares first
    if (Array.isArray(ignoreMiddlewares)){
        middlewares = middlewares.map((middleware)=>{
            if(ignoreMiddlewares.indexOf(middleware) === -1){
                if (middleware !== undefined){
                    return middleware
                }
            }
        })
    }

    return middlewares;


}