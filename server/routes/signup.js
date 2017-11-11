module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.post('/', function (req, res) {
        const set = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            country: req.body.country,
            bio: req.body.bio,
            author: req.body.author
        };
        const query = `INSERT INTO user SET ?;`;

        mysql.query(query, set, function (err) {
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