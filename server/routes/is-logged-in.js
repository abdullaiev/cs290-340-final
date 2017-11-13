module.exports = function () {
    const express = require('express');
    const app = express();

    app.get('/', function(req, res) {
        const user = req.session.user || null;

        res.send({
            isLoggedIn: false,
            success: true,
            user: user
        });
    });

    return app;
}();