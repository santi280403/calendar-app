import mysql from 'mysql';

import keys from './config/keys'

const { promisify } = require('util');

const pool = mysql.createPool(keys.DB);

pool.getConnection((err: any, conn: any) => {

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if (conn) {
        console.log('DB is Connected');

        return;
    }

});

pool.query = promisify(pool.query);

export default pool;