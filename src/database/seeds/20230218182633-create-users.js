const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Luiz Otavio',
          email: 'luiz@gmail.com',
          password_hash: await bcrypt.hash('Luiz1#', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Lara Croft',
          email: 'tombraider@gmail.com',
          password_hash: await bcrypt.hash('Lara1#', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Valen Bravo',
          email: 'valen@gmail.com',
          password_hash: await bcrypt.hash('Valen1#', 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() {},
};
