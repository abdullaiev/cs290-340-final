module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.get('/', function (req, res, next) {
        const query = `SELECT category.id, category.name, (
                           SELECT COUNT(book.id) from book WHERE book.category_id = category.id
                       ) AS books FROM category`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    });

    app.post('/', function (req, res, next) {
        const name = req.body.name;
        const query = `INSERT INTO category (name) VALUES ('${name}');`;

        mysql.query(query, function (err) {
            if (err) {
                next(err);
                return;
            }

            res.send({
                success: true
            })
        });
    });

    return app;
}();