module.exports = function(req, res, next) {
    if (req.session && req.session.user) {
        const mysql = require('../conf/db');
        const {email} = req.session.user;
        const query = `SELECT * FROM user WHERE email = '${email}'`;

        mysql.query(query, function (err, rows) {
            let user = rows && rows[0];

            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
            }

            next();
        })
    } else {
        next();
    }
};