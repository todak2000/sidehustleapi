const repo          = require('../repositories/project');
const factory       = require('../factories/project');
const bidFactory    = require('../factories/bid');
const bidRepo       = require('../repositories/bid');
const statusHelper  = require('../../helpers/statuses');
const userTypeHelper = require('../../helpers/userTypes');
const projectTypeHelper = require('../../helpers/projectTypes');

module.exports = class Hustle {
    static async create(req,res){


        try {
            let hustle =  await factory.create(
                {
                    ...req.body,
                    created_by:req.payLoad.userId,
                    status_id:statusHelper.active
                },
            );

            if (req.body.project_type_id == projectTypeHelper.closed){
               let bid = await bidFactory.create({
                    user_id:req.body.bidder_id,
                    amount:req.body.amount,
                    project_id:hustle.id,
                    status_id:statusHelper.active
                });
                let bidder = await bid.getBidder();

                bidder.notify({
                   subject: "Hustle",
                   text: `Hi ${bidder.name}, a hustle has been created for you`,
               });

            }
            res.withSuccess(201).reply();
        }catch (e) {
            console.log(e);
            res.withServerError(500).reply();
        }
    }

    static async update(req,res){
        try {
            let hustle = await factory.update({
                ...req.body,
                created_by: req.payLoad.userId
            },{
                where:{
                    [factory.model.Op.and] : {
                        created_by:req.payLoad.userId,
                        status_id:{
                            [factory.model.Op.ne]:statusHelper.deleted//don't update deleted hustles
                        }
                    }

                }

            });

            res.withSuccess(200).reply();

        }catch (e) {
            res.withServerError(500).reply();
        }
    }

    static async mine (req,res){

        try {
            let projects = await repo.findAll({
                where: {
                    ...req.query.q,
                    created_by: req.payLoad.userId
                },
                attributes:{
                    exclude:['local_government_id','category_id','status_id','created_by'],
                },
                limit:req.query.per_page,
                include:[
                    {
                        association:"category",

                    },
                    {
                        association:'user',
                        attributes:['name','email','phone_number'],

                    },
                    {
                        association:"local_government",
                        attributes:{
                            exclude:['status_id','state_id'],
                        },
                        include:[{
                            association:'state',
                            attributes:{
                                exclude:['status_id'],
                            },
                        }]
                    }
                ]
            });
            res.withSuccess(200).withData(projects).reply();
        }catch (e) {
            console.log(e)
            res.withServerError(500).reply()
        }


    }
};