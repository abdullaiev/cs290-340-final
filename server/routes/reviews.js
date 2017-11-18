module.exports = function () {
    const express = require('express');
    const mysql = require('../conf/db');
    const app = express();

    app.get('/book/:id', function (req, res, next) {
        fetch('book_id', req, res, next);
    });

    app.get('/user/:id', function (req, res, next) {
        fetch('user_id', req, res, next);
    });

    app.post('/book/:id', function (req, res, next) {
        const query = `INSERT INTO review (book_id, user_id, review, rating, posted) VALUES (?, ?, ?, ?, ?);`;
        const values = [req.params.id, req.session.user.id, req.body.review, req.body.rating, Date.now()];

        mysql.query(query, values, function (err) {
           if (err) {
               next(err);
           } else {
               res.send({
                   success: true
               });
           }
        });
    });

    app.put('/book/:id', function (req, res, next) {
        const id = req.params.id;
        const query = `UPDATE review SET review = ?, rating = ? WHERE id = ?;`;
        const values = [req.body.review, req.body.rating, id];

        mysql.query(query, values, function (err) {
            if (err) {
                next(err);
            } else {
                res.send({
                    success: true
                });
            }
        });
    });

    function fetch(type, req, res, next) {
        const id = req.params.id;
        const query = `SELECT review.id, review.review, review.rating, review.book_id, review.user_id, 
                              review.posted, book.title as book_title, user.first_name, user.last_name
                       FROM review 
                       INNER JOIN user on review.user_id = user.id
                       INNER JOIN book on review.book_id = book.id 
                       WHERE ${type} = ${id} ORDER BY review.posted DESC`;

        mysql.query(query, function (err, rows) {
            if (err) {
                next(err);
            } else {
                res.send(rows);
            }
        });
    }

    return app;
}();