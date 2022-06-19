'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: "admin",
      password: "$2b$12$ls/mqjaa3Iu7w2zIy41RmOLtcH.aRLKUg5.JjR0mWPhOuZHl3Jvfy",
      role: "administrator",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "adhy",
      password: "$2b$12$ls/mqjaa3Iu7w2zIy41RmOLtcH.aRLKUg5.JjR0mWPhOuZHl3Jvfy",
      role: "moderator",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
