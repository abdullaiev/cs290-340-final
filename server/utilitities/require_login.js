module.exports = function requireLogin (req, res, next) {
    if (!req.user) {
        res.status(401);
        res.send('Not Authorized.');
    } else {
        next();
    }
};