'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('suggestions', [
      {
        name: "Mendayung perahu",
        slug: "mendayung-perahu",
        description: "ya mendayung",
        category: "teknologi",
        img: "",
        visited_count: 0,
        suggester_email: "adhy@gmail.com",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Memancing",
        slug: "memancing",
        description: "ya mendayung",
        category: "teknologi",
        img: "",
        visited_count: 0,
        suggester_email: "adhy@gmail.com",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Berlayar",
        slug: "berlayar",
        description: "ya mendayung",
        category: "teknologi",
        img: "",
        visited_count: 0,
        suggester_email: "adhy@gmail.com",
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suggestions', null, {});
  }
};
