const express = require('express');
const session = require('client-sessions');
const bodyParser = require('body-parser');
const requireLogin = require('./utilitities/require_login');
const app = express();

app.set('port', process.argv[2]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    cookieName: 'session',
    secret: 'cs290-cs340-f2017',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('./middleware/session'));

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/users', requireLogin, require('./routes/users'));
app.use('/api/books', requireLogin, require('./routes/books'));
app.use('/api/categories', requireLogin, require('./routes/categories'));
app.use('/api/reviews', requireLogin, require('./routes/reviews'));

app.use(require('./routes/404'));
app.use(require('./routes/500'));

app.listen(app.get('port'), function () {
    console.log('Express started on port: ' + app.get('port') + '.');
});
