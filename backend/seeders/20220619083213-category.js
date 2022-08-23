'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: "Teknologi",
        slug: "teknologi",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Audio Visual",
        slug: "audio-visual",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Sastra",
        slug: "sastra",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Kerajinan",
        slug: "kerajinan",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Otomotif",
        slug: "otomotif",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Olahraga",
        slug: "olahraga",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Lainnya",
        slug: "lainnya",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
