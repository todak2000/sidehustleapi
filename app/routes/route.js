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
            helpers:{
                ignoreMiddlewares: ['isLoggedIn'],
                project:{
                    types:{
                        controller:{
                            path:"project_type",
                            method:"list"
                        },
                        verb:'get'
                    }
                },
                states:{
                    list:{
                        controller:{
                            path:'state',
                            method:"list"
                        },
                        verb:'get'
                    }
                },
                statuses:{
                    list:{
                        controller:{
                            path:'status',
                            method:"list"
                        },
                        verb:'get'
                    }
                },
                usertypes:{
                    list:{
                        controller:{
                            path:'user_type',
                            method:"list"
                        },
                        verb:'get'
                    }
                },
                categories:{
                    list:{
                        controller:{
                            path:'category',
                            method:"list"
                        },
                        verb:'get'
                    }
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