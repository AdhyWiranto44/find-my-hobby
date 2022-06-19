'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        "username": "admin",
        "password": "$2b$12$ath594/Xrt9xRpE5YSGuN.CehAxfct13Dpm1DgJDNqZS.VLFRwu76",
        "role": "administrator",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        "username": "adhy",
        "password": "$2b$12$ath594/Xrt9xRpE5YSGuN.CehAxfct13Dpm1DgJDNqZS.VLFRwu76",
        "role": "moderator",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
