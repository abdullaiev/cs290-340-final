module.exports = function () {
    const express = require('express');
    const app = express();

    app.get('/', function(req, res) {
        req.session.reset();
        res.redirect('/');
    });

    return app;
}();