const { Pool } = require("pg");
const dotenv = require("dotenv");
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
        console.log("Connection...");
        await pool.connect()
        console.log("Success");
        // const res = await pool.query('SELECT *')
        // console.log(res)
        // console.log("Closing Database...");
        // await pool.end()
        // console.log("Database closed");
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDb }