const {Wallets}             = require('../models');
const Base                  = require('./base');


module.exports = class Wallet extends Base{

   static model = Wallets;

  static async credit(initialAmount,amount,wallet_id,transaction){

      amount = initialAmount+amount;

    return await  Wallet.model.update({
         amount
      },{
         where:{
            id:wallet_id
         },
         transaction
      });
   }

    static async debit(initialAmount,amount,wallet_id,transaction){

        amount = initialAmount-amount;

        return await  Wallet.model.update({
            amount
        },{
            where:{
                id:wallet_id
            },
            transaction
        });
    }






   static  async createWallet(){
       return await Wallet.create({
           ...obj,
           tag:`wallet|TaxitPay|${Date.now()}`
       });
   }

   static async createSubWallet(obj,transaction){
      return await this.create({
          ...obj,
          tag:`subWallet|TaxitPay|${Date.now()}`
      },transaction);
   }

};