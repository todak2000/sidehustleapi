'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Project_types', [
      {
        name        : 'open',
        status_id   : 1
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'closed',
        status_id   : 1

        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),


      },

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
    return queryInterface.bulkDelete('Project_types', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
