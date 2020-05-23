const Monnify = require('./monnify');
module.exports = class Switch {
    constructor(switchType,keyType) {
        switch (switchType) {
            case "monnify":
               return new Monnify(keyType);
               break;
            default:
                throw "No switch selected"
        }
    }
}