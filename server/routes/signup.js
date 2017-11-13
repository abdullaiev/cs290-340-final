module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.post('/', function (req, res, next) {
        const query = `INSERT INTO user SET ?;`;

        mysql.query(query, req.body, function (err) {
            if (err) {
                res.status(400);
                res.send({
                    success: false,
                    message: err.message
                });
            } else {
                getUser(req.body.email, req, res, next);
            }
        });
    });

    function getUser(email, req, res) {
        const query = `SELECT * from user WHERE email = "${email}";`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                let user = rows[0];
                delete user.password;
                req.session.user = user;
                req.session.save();
                res.send({
                    success: true,
                    user: user
                });
            }
        });
    }

    return app;
}();