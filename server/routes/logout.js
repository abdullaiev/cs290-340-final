module.exports = function () {
    const express = require('express');
    const app = express();

    app.get('/', function(req, res) {
        req.session.destroy();
        res.send({
            success: true
        });
    });

    return app;
}();