const nodemailer = require('nodemailer');
module.exports = function mailer () {

    try{
        let transport =  nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure:false,
            auth:{
                user:process.env.MAIL_USERNAME,
                pass:process.env.MAIL_PASSWORD
            }
        });

        return transport;
    }catch (e) {
        console.warn(e);
    }
};