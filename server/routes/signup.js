module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.post('/', function (req, res) {
        const query = `INSERT INTO user SET ?;`;

        mysql.query(query, req.body, function (err) {
            if (err) {
                res.status(400);
                res.send({
                    success: false,
                    message: err.message
                });
            } else {
                let user = req.body;
                delete user.password;
                req.session.user = user;
                req.session.save();
                res.send({
                    success: true
                });
            }
        });
    });

    return app;
}();