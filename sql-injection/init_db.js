'use strict';

var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true
});

var sql_queries = fs.readFileSync(path.join(__dirname, 'init_db.sql')).toString();
con.query(sql_queries, function (err, results) {
  if (err) throw err;
});

con.end();
