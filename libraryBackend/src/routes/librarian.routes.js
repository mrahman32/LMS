const express = require('express');
const app = express();
const librarianRoute = express.Router();

let Librarian = require('../models/Librarian');

//Add librarian for library
librarianRoute.route('/add-librarian').post((req, res, next) => {
    Librarian.create(req.body)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        return next(err);
    })
});

//get all librarians
librarianRoute.route('/').get((req, res, next) => {
    Librarian.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});

//get librarian by id
librarianRoute.route('/read-librarian/:id').get((req, res, next) => {
    Librarian.findById(req.params.id)
    .then((result)=>{
        return res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});

//update librarian
librarianRoute.route('/update-librarian/:id').put((req, res, next) => {
    Librarian.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
    .then((result)=>{
        return res.json(result);
    })
    .catch((err)=>{
        return next(err);
    });
});

//delete librarian
librarianRoute.route('/delete-librarian/:id').delete((req, res, next) => {
    Librarian.findByIdAndRemove(req.params.id)
    .then((result)=>{
        return res.status(200).json({
            msg: result
        })
    })
    .catch((err)=>{
        return next(err);
    });
});

module.exports = librarianRoute;