const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });
    console.log('Connection...');
    await pool.connect();
    console.log('Success');
    await pool.query(`DROP TABLE users`);
    await pool.query(`CREATE TABLE IF NOT EXISTS users (id INT, name VARCHAR(255), last_name VARCHAR(255));`);
    await pool.query(`INSERT INTO users (id, name, last_name) VALUES (0, 'Kilian', 'LeKilian');`);
    await pool.query(`INSERT INTO users (id, name, last_name) VALUES (0, 'Xavier', 'LeXavier');`);
    const res = await pool.query(`SELECT * FROM users`);
    console.log(res.rows);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
