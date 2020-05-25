'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Local_governments', [
      {
        name        : 'Shomolu',
        state_id    : "1",
        status_id   : 1

        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'Bariga',
        state_id    : "1",
        status_id   : 1

        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),


      }

    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Local_governments');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
