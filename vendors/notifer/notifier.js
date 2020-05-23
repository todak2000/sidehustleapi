const transport = require('../../config/mailer')();

module.exports = async function  notify (model,options) {

    try{
        console.log('sending notification');
        let mail =  await transport.sendMail({
            from:process.env.MAIL_FROM||'no-reply',
            to:model.email,
            ...options
        });
        console.log(mail)
    }catch (e) {
        console.log(e)
    }


}