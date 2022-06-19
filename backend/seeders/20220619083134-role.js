'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: "Administrator",
        slug: "administrator",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Moderator",
        slug: "moderator",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
