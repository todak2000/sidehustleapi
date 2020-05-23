const axios = require('axios');
const gatewayKeys = require('../helpers/gatewayKeys');
const gatewayTypes = require('../helpers/gatewayTypes');
const statusHelper = require('../helpers/statuses');
const randomizer   = require('../helpers/randomizer');

module.exports = class Monnify  {


     constructor(type) {
         if (type == undefined){
             throw "Type is undefined"
         }
         let keys;
         //choose keys based on the req choice
         if (type == "test"){
              keys = gatewayKeys[gatewayTypes.MONNIFY].test;

         }else if (type == "live"){
              keys = gatewayKeys[gatewayTypes.MONNIFY].live;
         }



         this.baseUrl       = keys.BASE_URL;
         this.apiKey        = keys.API_KEY;
         this.secretKey     = keys.SECRET_KEY;
         this.contractCode  = keys.CONTRACT_CODE;
         this.walletId      = keys.WALLET_ID;

         this.axios = axios.create({
             baseURL:this.baseUrl,
             auth:{
                 username:this.apiKey,
                 password:this.secretKey
             }
         })
     }

     async initTransaction(obj){
         try{
             //send response to monnify
             let response =   await  this.axios.post(`merchant/transactions/init-transaction`,{
                 redirectUrl        :obj.redirect_url,
                 amount             :obj.amount,
                 customerName       :obj.name,
                 customerEmail      :obj.email,
                 paymentReference   :obj.internal_reference_number,
                 paymentDescription :obj.description,
                 currencyCode       :obj.currency_code||"NGN",
                 contractCode       :this.contractCode
             });
             //strimline the response
             if (response.data.responseMessage === 'success'){
                 let {data} = response;
                 return {
                        reference_number:data.responseBody.paymentReference,
                        transaction_number:data.responseBody.transactionReference,
                        checkout_url:data.responseBody.checkoutUrl
                 }
             }else{
                return false
             }
         }catch (e) {
             console.log(e);
            return false
         }
    }

    async checkTransactionStatus(obj){
        try {
            let query;
            if (obj.transaction_number){
                query = `transactionReference=${obj.transaction_number}`
            }else if(obj.reference_number){
                query = `paymentReference=${obj.reference_number}`
            }else{
                return  false;
            }


            let response = await this.axios.get(`merchant/transactions/query?${query}`);

            if (this.checkResponse(response)){
                let data = this.checkResponse(response);
                if (data.paymentStatus === "PAID") {
                     return {
                         status:statusHelper.success
                     }

                }else if(data.paymentStatus === "PENDING"){
                    return {
                        status:statusHelper.pending
                    }
                }

                return {
                    paymentStatus:statusHelper.failed
                }
            }

            return false;



        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async singleDisbursement(obj){
         try{

             let response = await this.axios.post('disbursements/single',{

                 amount           :   obj.amount,
                 reference        :   obj.internal_reference_number,
                 narration        :   obj.description,
                 bankCode         :   obj.bank_code,
                 accountNumber    :   obj.account_number,
                 currency         :   obj.currency||"NGN",
                 walletId         :   this.walletId
             });

             if(response.data.responseMessage === 'success'){
                 let data = response.data.responseBody;
                 let status;

                 if (data.status === "SUCCESS") {
                     status = statusHelper.success;
                 }else if(data.status === "PENDING"){
                     status = statusHelper.pending;
                 }else if(data.status === "FAILED"){
                     status = statusHelper.failed;
                 }

                 return {
                     amount:data.amount,
                     reference_number:data.reference,
                     transaction_number: `Transaction|Debit|${Date.now()}`,
                     status
                 }


             }else{
                 return false;
             }

         }catch (e) {
             console.log(e)
             return  false;
         }

   }

   async verifyBankAccount(obj){


        try {
            let response = await this.axios.get(`disbursements/account/validate?accountNumber=${obj.account_number}&bankCode=${obj.bank_code}`);

            if (response.data.responseMessage === 'success'){
                response = response.data.responseBody;
                return {
                    account_number:response.accountNumber,
                    account_name:response.accountName,
                    bank_code:response.bankCode
                }
            }else{
                return false;
            }
        }catch (e) {
            console.log(e);
            return  false;
        }


   }

  async bulkDisbursement(obj){

         try{
             //
            let mutatedTransactionList = [];

            obj.transaction_list.forEach((transaction)=>{

                mutatedTransactionList.push({
                    amount:transaction.amount,
                    reference:transaction.internal_reference_number,
                    narration:transaction.description,
                    bankCode:transaction.bank_code,
                    accountNumber: transaction.account_number,
                    currency:transaction.currency||"NGN"
                })

            });

             let response = await this.axios.post(`disbursements/batch`,{

                 batchReference         :   obj.internal_reference_number,//transaction reference was intentionally used here because it is the only unique number on our system and we can use to track the company
                 narration              :   obj.description,
                 bankCode               :   obj.bank_code,
                 onValidationFailure    :   "CONTINUE",
                 notificationInterval   :   25,
                 walletId               :   obj.walletId||this.walletId,
                 title                  :   "Bulk Transfer",
                 transactionList        : mutatedTransactionList,


             });

             if (response.data.responseMessage === 'success'){
                 let data = response.data.responseBody;

                 let status;

                 if (data.status === "SUCCESS"||data.status === "COMPLETED") {
                     status = statusHelper.success;
                 }else if(data.status === "PENDING" || data.status === "AWAITING_PROCESSING"||data.status ==="PENDING_AUTHORIZATION"||data.status ==="IN_PROGRESS"){
                     status = statusHelper.pending;
                 }else if(data.status === "FAILED"||data.status ==="FAILED_ON_ACCOUNTS_VALIDATION"){
                     status = statusHelper.failed;
                 }


                 return {
                         amount:data.totalAmount,
                         reference_number: data.batchReference,
                         status
                        }
             }else{
                 return false;
             }


         }catch (e) {
             console.log(e);
             return false
         }
   }

    checkResponse(response){
         if (response.data.responseMessage === 'success'){
             return response.data.responseBody;
         }else{
             return false;
         }
    }

    async getBatchTransactions({batchReference,batchStatus}){

         let transactions = [];
         if (batchStatus === "COMPLETED"){
             try {
                 let response = await this.axios.get(`disbursements/bulk/${batchReference}/transactions?pageNo=0&pageSize=10`);

                 if (response.data.responseMessage === 'success'){

                    transactions =  transactions.concat(response.data.responseBody.content);

                     //get number of pages to know how many times to run a for loop
                     let totalPages = response.data.responseBody.totalPages;

                     for (let i = 1; i <= totalPages-1 ; i++) {
                         let response = await this.axios.get(`disbursements/bulk/${batchReference}/transactions?pageNo=${i}&pageSize=10`);
                         transactions = transactions.concat(response.data.responseBody.content);
                     }

                    return {
                        internal_reference_number:batchReference,
                         transaction_list: transactions.map((transaction)=>{
                            return {
                                internal_reference_number:transaction.reference,
                                status:this.statusHelper(transaction.status),
                                amount:transaction.amount
                            }
                        })
                    }
                 }

                 return false;



             }catch (e) {
                 console.log(e);
                 return false;
             }
         }else{
             return false;
         }


    }



    creditCharge(amount){
         if (amount <= 500){
             return 50;
         }

         if (amount > 501 <= 1000 ){
             return 100;
         }

         if (amount > 1000){
             return 300;
         }

         return 0;
    }

    debitCharge(amount){
        if (amount <= 500){
            return 50;
        }

        if (amount > 501 <= 1000 ){
            return 100;
        }

        if (amount > 1000){
            return 300;
        }

        return 0;
    }


    statusHelper(status){
        if (status === "SUCCESS"||status === "COMPLETED") {
         return statusHelper.success;
        }else if(status === "PENDING" || status === "AWAITING_PROCESSING"||status ==="PENDING_AUTHORIZATION"||status ==="IN_PROGRESS"){
            return statusHelper.pending;
        }else if(status === "FAILED"||status ==="FAILED_ON_ACCOUNTS_VALIDATION"){
            return statusHelper.failed;
        }
    }


};