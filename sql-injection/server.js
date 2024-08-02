'use strict';

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {

  var fs = require('fs');
  var path = require('path');
  var mysql = require('mysql');
  var filePath = path.join(__dirname, 'html/index.html');
  var sql_data = "";
  var data = "";
  const allowedUsernames = ['admin', 'sales', 'backoffice'];

  //SQL Login
  if(req.query.sent === "1") {

    //Connect to Database
    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "sql_injection"
    });

    //Create "Concatenated"-SQL query (vulnerable to sql injection) and call it
    var sql = "SELECT * FROM `user` WHERE username = '" + req.query.username + "' AND password = '" + req.query.password + "';";

    con.query(sql, function (err, results) {

      sql_data = "<code>" + sql + "</code>";
      
      if (!err) {

        if (results.length && allowedUsernames.includes(req.query.username)) {
          data = "<div class='data'>";
            data += "<h4>Ich habe erfolgreich einen SQL-Injection Angriff durchgeführt!</h4>";
            data += "<ul>";
              data += "<li><strong>User: </strong>" + req.query.username + "</li>";
              data += "<li><strong>Secret: </strong>" + getSecretByUsername(results, req.query.username) + "</li>";
            data += "</ul>";
          data += "</div>";
        }
        else {
          data = "<div class='data'>";
            data += "<h4>Login fehlgeschlagen!</h4>";
          data += "</div>";
        }
      }
    });

    con.end();

  }

  //Output
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,html){
    if (!err) {
        html = html.replace(/###DATA###/g, data);
        html = html.replace(/###SQLQUERY###/g, sql_data);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    } else {
        console.log(err);
    }
  });
});

function getSecretByUsername(results, username) {

  var secret = "n/a";

  results.forEach(result => {
    if(result.username === username)
      secret = result.secret;
  });

  return secret;
}

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
