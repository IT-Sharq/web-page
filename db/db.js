const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

module.exports = new Sequelize({
  database: process.env.DATABASE,
  dialect: process.env.DIALECT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
});
