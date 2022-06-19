'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hobbies', [
      {
        name: "Hobi 1",
        slug: "hobi-1",
        description: "deskripsi hobi 1",
        category: "teknologi",
        img: "",
        community_name: "Komunitas di Facebook",
        community_link: "https://facebook.com/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Hobi 2",
        slug: "hobi-2",
        description: "deskripsi hobi 2",
        category: "audio-visual",
        img: "",
        community_name: "Komunitas di Facebook",
        community_link: "https://facebook.com/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Hobi 3",
        slug: "hobi-3",
        description: "deskripsi hobi 3",
        category: "sastra",
        img: "",
        community_name: "Komunitas di Facebook",
        community_link: "https://facebook.com/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      },
      {
        name: "Hobi 4",
        slug: "hobi-4",
        description: "deskripsi hobi 4",
        category: "kerajinan",
        img: "",
        community_name: "Komunitas di Facebook",
        community_link: "https://facebook.com/",
        visited_count: 0,
        "createdAt": new Date(),
        "updatedAt": new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hobbies', null, {});
  }
};
