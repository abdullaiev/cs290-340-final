module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    function getUsers(authors, res, next) {
        let query = `SELECT * from user WHERE author = ${authors ? 'TRUE' : 'FALSE'}`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    }

    app.get('/', function (req, res, next) {
        getUsers(false, res, next);
    });

    app.get('/authors', function (req, res, next) {
        getUsers(true, res, next);
    });

    return app;
}();