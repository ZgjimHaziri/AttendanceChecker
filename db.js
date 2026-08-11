'use strict';

const mysql = require('mysql2/promise');
const config = require('./config/database');

const pool = mysql.createPool(config);

module.exports = pool;
