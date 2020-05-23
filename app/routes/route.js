module.exports = {
    'api': {
        middlewares: ['smooch', 'useJSON'],
        'v1': {
            middlewares:['isLoggedIn'],
            'auth': {
                ignoreMiddlewares:['isLoggedIn'],//ignoring for all auth path
                'login': {
                    controller: {
                        path: 'auth',
                        method: 'login'
                    },
                    middlewares: [],
                    verb: 'post'
                },
                'register': {
                    controller: {
                        path: 'auth',
                        method: 'register'
                    },
                    middlewares: [],
                    verb: 'post'
                }
            },
            artisan:{
                middlewares:['isArtisan'],
                projects:{
                    create:{
                        controller:{
                            path:'project',
                            method:"create"
                        },
                        verb:"post"
                    },
                    update:{
                        controller:{
                            path:'project',
                            method:"update"
                        },
                        verb:"post"
                    },
                    list:{
                        controller:{
                            path:'project',
                            method:"mine"
                        },
                        verb:"get"
                    }
                }
            }
        }
    },

}