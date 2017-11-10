module.exports = function () {
    const mysql = require('../conf/db');
    const express = require('express');
    const app = express();

    app.post('/', function(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const query = `SELECT * FROM user 
                       WHERE email = '${email}' AND password = '${password}'`;

        mysql.query(query, function (err, rows) {
            if (err || !rows.length) {
                res.status(401);
                res.send();
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
        })
    });

    return app;
}();