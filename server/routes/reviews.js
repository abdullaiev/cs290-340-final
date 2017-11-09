module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.get('/book/:id', function (req, res, next) {
        const id = req.params.id;
        const query = `SELECT * FROM review WHERE book_id = ${id}`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    });

    app.get('/user/:id', function (req, res, next) {
        const id = req.params.id;
        const query = `SELECT * FROM review WHERE user_id = ${id}`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    });

    return app;
}();