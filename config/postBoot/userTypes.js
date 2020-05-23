const {User_types} = require('../../app/models');
const fs           = require('fs');


module.exports = async function () {
        try{
                let userTypes =   await User_types.findAll();
                let userTypesObj = {};

                userTypes.forEach((userType)=>{
                        userTypesObj[userType.name] = userType.id;
                });

                fs.writeFileSync('helpers/userTypes.js','module.exports='+JSON.stringify(userTypesObj,null,2));
        }catch (e) {
                throw e;
        }


}