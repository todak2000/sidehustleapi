'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [

      {
        name        : 'Guaranty Trust Bank Plc',
        code        : "058",
      },
 {
        name        : 'Access Bank Plc',
        code        : "044",
      },
 {
        name        : 'Access Bank Plc (Diamond)',
        code        : "063",
      },
 {
        name        : 'Ecobank Nigeria',
        code        : "050",
      },
 {
        name        : 'Fidelity Bank Plc',
        code        : "070",
      },
 {
        name        : 'First Bank of Nigeria Plc',
        code        : "011",
      },
 {
        name        : 'First City Monument Bank',
        code        : "214",
      },
 {
        name        : 'Heritage Bank',
        code        : "030",
      },
      {
        name        : 'Jaiz Bank',
        code        : "301",
      },
 {
        name        : 'Keystone Bank Ltd',
        code        : "082",
      },

 {
        name        : 'Polaris Bank',
        code        : "076",
      },
 {
        name        : 'Stanbic IBTC Plc',
        code        : "039",
      },
 {
        name        : 'Sterling Bank Plc',
        code        : "232",
      },
      {
        name        : 'Union Bank of Nigeria',
        code        : "032",
      },
 {
        name        : 'United Bank for Africa Plc',
        code        : "033",
      },
 {
        name        : 'Unity Bank Plc',
        code        : "215",
      },
 {
        name        : 'WEMA Bank Plc',
        code        : "035",
      },
 {
        name        : 'Zenith Bank International',
        code        : "057",
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
