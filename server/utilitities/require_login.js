module.exports = function requireLogin (req, res, next) {
    if (!req.user) {
        //todo: redirect to #/login
        res.redirect('/');
    } else {
        next();
    }
};