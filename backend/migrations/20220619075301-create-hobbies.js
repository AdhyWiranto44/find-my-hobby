'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hobbies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      visited_count: {
        type: Sequelize.INTEGER
      },
      community_name: {
        type: Sequelize.STRING
      },
      community_link: {
        type: Sequelize.STRING
      },
      suggester_email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hobbies');
  }
};