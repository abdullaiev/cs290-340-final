module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.get('/', function (req, res, next) {
        getUsers({authors: false}, res, next);
    });

    app.get('/:id', function (req, res, next) {
        getUsers({id: req.params.id}, res, next);
    });

    app.get('/authors', function (req, res, next) {
        getUsers({authors: false}, res, next);
    });

    app.put('/', updateUser);

    app.delete('/', deleteUser);

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

    function updateUser(req, res, next) {
        const id = req.body.id;
        const query = `UPDATE user SET ? WHERE id = ${id}`;

        if (req.session.user.id !== id) {
            res.status(401);
            res.send({
                message: 'A user can only update hir or her own profile.'
            });
            return;
        }

        mysql.query(query, req.body, function (err) {
            if (err) {
                next(err);
            } else {
                res.send({
                    success: true
                });
            }
        });
    }

    function deleteUser(req, res, next) {
        const id = req.session.user.id;
        const query = `DELETE from user WHERE id = ${id}`;

        mysql.query(query, function (err) {
            if (err) {
                next(err);
            } else {
                req.session.destroy();
                res.send({
                    success: true
                });
            }
        });
    }

    return app;
}();