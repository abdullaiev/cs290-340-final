module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    function getUsers(config, res, next) {
        let query = `SELECT id, first_name, last_name, email, city, country, bio, author from user WHERE `;
        if (config.id) {
            query += `id = ${config.id}`;
        } else {
            query += `author = ${config.authors ? 'TRUE' : 'FALSE'}`;
        }

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    }

    app.get('/', function (req, res, next) {
        getUsers({authors: false}, res, next);
    });

    app.get('/:id', function (req, res, next) {
        getUsers({id: req.params.id}, res, next);
    });

    app.get('/authors', function (req, res, next) {
        getUsers({authors: false}, res, next);
    });

    return app;
}();