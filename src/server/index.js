const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Instantiate Express application
const app = express();
// Base query for getting information from database
const baseGETQueryString =`SELECT * FROM user WHERE `;

// NOTE: The database name is not the schema name
// NOTE: do a console.log(connection) to see what config parameters you can modify. Must be done within constructor
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'react_sql'
    }
);

// Make connection to database
connection.connect(err => {
    if(err) {
        //console.log(err);
        return err;
    }
});

app.use(cors());

// Base URL
app.get('/', (req, res) => {
    res.send('Welcome to VandyBank');
});

// Sign user up
app.all('/signup', (req, res) => {

    let payload = { };

    payload = JSON.parse(req.query.payload).signUpPayload;

    const username = payload.email.split("@")[0];

    // ************************************************************************** //
    // ************************************************************************** //
    // Vulnerability #2 - Implementation Mistake                                  //
    // A supplement to this vulnerability since no check is performed to see if   //
    // the user that is signing up already exists in the database. This allows    //
    // attackers to create duplicate accounts. Should perform a SELECT query      //
    // in order to get the possible user and then return a response if the user   //
    // already exists.
    // ************************************************************************** //
    // ************************************************************************** //

    connection.query(`INSERT INTO user VALUES (null, '${username}', '${payload.password}', '${payload.email}', '${payload.phone}', '${payload.ssn}')`, (err, results) => {
        if(err) {
            return res.send(req.query); // Bad because it gives away sql query format
        } else {
            return res.json({data: results});
        }
    });
});

// step 1: http://localhost:3000/user?username=%27 -> returns sql error statement
// step 2: http://localhost:3000/user?username=&password=anything%27%20OR%20%27x%27=%27x gives you all contents of table.
app.get('/user', (req, res) => {
    // Allows user to directly login from the address bar
    let { username, password } = req.query;

    // ************************************************************************** //
    // ************************************************************************** //
    // Vulnerability #1 - Injection Attack                                        //
    // Inserting the following text in password retrieves all users in the `user` //
    // table in the `react_sql` database:                                         //
    //                                                                            //
    //                ;' OR 'x'='x                                                //
    //                                                                            //
    // The results are printed to the console.                                    //
    // ************************************************************************** //
    // ************************************************************************** //

    // Prepare query
    const preparedQuery = baseGETQueryString + `username=` + `'${username}'` + ` AND ` + `password=` + `'${password}'`; // <- This string tells you what sql is being used
    connection.query(preparedQuery, (err, results) => {
        if(err) {
            return res.send(err); // Bad because it gives away sql query format
        } else {
            return res.json({data: results});
        }
    });
});

// Forgot password
app.all('/forgot', (req, res) => {

    let payload = { };

    payload = JSON.parse(req.query.payload).forgotPasswordPayload;
    console.log(payload);
    connection.query(`SELECT * FROM user WHERE email='${payload.email}' AND phone='${payload.phone}' AND ssn='${payload.ssn}'`, (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err); // Bad because it gives away sql query format
        } else {
            console.log(res);
            return res.json({data: results});
        }
    });
});

// Application will continuously listen on the port passed in.
app.listen(3000, () => {
    console.log('Users server listening on port 3000')
});

/// EXAMPLE QUERIES

/*
*
  CREATE TABLE `react_sql`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `position` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
*
  `SELECT * FROM user WHERE username='jackfrost' AND password='password'`;
*
*/

/// EXAMPLE res responses

/*
*
  .send("<h1>XSS</h1>"); //.json({data: results.toLocaleString()});
*
 */