const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');

const tablesSQL = fs.readFileSync('db/tables.sql').toString();
const initialDataSQL = fs.readFileSync('db/initialData.sql').toString();
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  pool.query(tablesSQL)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
* Load initial data
*/
const loadData = () => {
  pool.query(initialDataSQL)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
* Drop Tables
*/
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS measures, measurements, exercises, planned_workouts, completed_workouts';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  loadData,
  dropTables
};

require('make-runnable');

