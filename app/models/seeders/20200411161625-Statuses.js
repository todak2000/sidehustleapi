'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Statuses', [
      {
        name        : 'active',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'inActive',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),


      },
      {
        name        : 'suspended'
      },
      {
        name        : 'accepted',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'deleted',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'pending',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'success',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      },
      {
        name        : 'failed',
        // createdAt   :  new Date(),
        // updatedAt   :  new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Statuses', null, {});

  }
};
