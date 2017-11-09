module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.post('/', function (req, res) {
        let {firstName, lastName, email, password, city, country, bio, author} = req.body;
        let query = `INSERT INTO user 
                     (first_name, last_name, email, password, city, country, bio, author) 
                     VALUES 
                     ('${firstName}', '${lastName}', '${email}', '${password}', '${city}', '${country}', '${bio}', '${author}');`;

        mysql.query(query, function (err) {
            if (err) {
                req.status(400);
                res.send({
                    success: false
                });
            } else {
                let user = req.body;
                delete user.password;
                req.session.user = user;
                res.send({
                    success: true
                });
            }
        });
    });

    return app;
}();