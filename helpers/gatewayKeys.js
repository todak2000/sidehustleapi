const gatewayTypes = require('./gatewayTypes');
module.exports = {
    [gatewayTypes.MONNIFY]:{
        live:{
            API_KEY:"MK_PROD_XKPZ3EHV52",
            SECRET_KEY:"F98U9HQ8RDZQ5EPYAEAT3KV3D8F9RRAW",
            CONTRACT_CODE:"842352241715",
            BASE_URL:"https://api.monnify.com/api/v1",
            WALLET_ID:"MP|WALLET|60DB12273AAFE40C1737AB8F43562108"
        },
        test:{
            API_KEY:"MK_TEST_9P26AZ6LRZ",
            SECRET_KEY:"ZQ5ATHPNC8H4E4D45GGANQZLFR76XDT2",
            CONTRACT_CODE:"5691993488",
            BASE_URL:"https://sandbox.monnify.com/api/v1",
            WALLET_ID:"013DFAC0F83A44AFAA6900E02941560E"
        }
    }
}