module.exports = function () {
    const express = require('express');
    const app = express();

    app.get('/', function(req, res) {
        if (req.session.user) {
            res.send({
                isLoggedIn: true,
                success: true,
                user: req.session.user
            });
        } else {
            res.send({
                isLoggedIn: false,
                success: true
            });
        }
    });

    return app;
}();