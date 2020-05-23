const userRepository = require('../repositories/user');
const jwt = require('jsonwebtoken');
const userFactory = require('../factories/user');
const walletFactory = require('../factories/wallet');
const passwordHelper = require('../../helpers/password');
const keyTypesHelper = require('../../helpers/keyTypes');
const statusHelper = require('../../helpers/statuses');
const userTypes = require('../../helpers/userTypes');
const randomnizer = require('../../helpers/randomizer');
const fs           =     require('fs');


module.exports = class Auth {

    static factory = userFactory;
    static repository = userRepository;

    static async login(req, res) {
        let whereObj;


        let obj = {
            where: {
                [Auth.factory.model.Op.or] : [{email:req.body.user_name},{phone_number:req.body.user_name}]
            }
        };
        let userDet;

       try {

           let userResult = await Auth.repository.findOne(obj);
           if (userResult) {
               userDet = userResult.toJSON();
               let isSame = await passwordHelper.isSame(req.body.password, userDet.password);
               if (isSame) {
                   Auth.loginUser(req,res, userDet);
               } else {
                   return res.withClientError(404).reply();
               }
           }else{
               res.withClientError(404).reply();
           }

       }catch (e) {
           console.log(e);
            res.withServerError(500).withErrorData(e).reply();
       }

    }

    static loginUser(req, res, user) {
        console.log(user);
        let payLoad = {
            userId: user.id,
            userTypeId: user.user_type_id,
            companyId:user.companyId
        };

        //Implement JWT
        let privateKey = fs.readFileSync('jwt_pk.key', 'utf8');

        jwt.sign(payLoad, privateKey, {expiresIn: '23h', algorithm: 'RS256'}, function (err, code) {
            if (err) {
                console.log(err);
                return res.withServerError(500).reply();
            } else {
                return res.withSuccess(200).withData({token: code}).reply();
            }
        })
    }

    static async register(req, res) {

        let t =  await userFactory.startTransaction();


        try {
            switch (req.body.user_type_id) {
                case userTypes.artisan:
                case userTypes.client:
                    req.body.password   =   passwordHelper.hash(req.body.password);
                    req.body.status_id  =   statusHelper.active;
                    let user = await Auth.factory.create(req.body, t);
                    //Todo: change to email template
                   await user.notify({
                        subject: "Account Created Successfully",
                        text: `Hi ${user.name}, welcome to side hustle`,
                    });
                    let walletObj = {
                        user_id:user.id,
                        amount:0.00
                    };
                    await Auth.wallet(walletObj,t);
                break;


            }
            t.commit();




            res.withSuccess(201).reply();


        } catch (e) {
            t.rollback();
            console.log(e);

            res.withServerError(500).withErrorData(e).reply();
        }


    }


    static  async wallet(obj,t){
       obj.tag = await randomnizer(10);
      return await  walletFactory.create(obj,t);
    }



}

