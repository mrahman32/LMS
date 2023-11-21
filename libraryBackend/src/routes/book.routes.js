const express = require('express');
const app = express();
const bookRoute = express.Router();

let Book = require('../models/Book');

//Add book for library
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        return next(err);
    })

   
});

//get all books from library
bookRoute.route('/').get((req, res, next) => {
    Book.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});


//get book by id
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id)
    .then((result)=>{
        return res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});

//update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
    .then((result)=>{
        return res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});

//delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
    .then((result)=>{
        return res.status(200).json({
            msg: result
        })
    })
    .catch((err)=>{
        return next(err);
    });
});

module.exports = bookRoute;