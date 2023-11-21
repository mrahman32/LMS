const express = require('express');
const axios = require('axios');
const app = express();
const studentRoute = express.Router();

let Student = require('../models/Student');

//Add student for library
studentRoute.route('/add-student').post((req, res, next) => {
    Student.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(err);
        })
});

//get all students
studentRoute.route('/').get((req, res, next) => {
    Student.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});

//get student by id
studentRoute.route('/read-student/:id').get((req, res, next) => {
    Student.findById(req.params.id)
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});

//update student
studentRoute.route('/update-student/:id').put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});

//delete student
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
    Student.findByIdAndRemove(req.params.id)
        .then((result) => {
            return res.status(200).json({
                msg: result
            })
        })
        .catch((err) => {
            return next(err);
        });
});

//3rd party API integration 
studentRoute.route('/get-zipinfo/:zip').get(async (req, res, next) => {


    const zipcode = req.params.zip;
    console.log('get-zipinfo called :' + zipcode)
    const apiUrl = `https://redline-redline-zipcode.p.rapidapi.com/rest/info.json/${zipcode}/degrees`;

    console.log(apiUrl);



    const options = {
        method: 'GET',
        url: apiUrl,
        headers: {
            'X-RapidAPI-Key': '106c61914cmsh808b1e41e0bd37ep15154djsnc2aa5e168f41',
            'X-RapidAPI-Host': 'redline-redline-zipcode.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return res.status(200).json(response.data);
    } catch (error) {
        return next(error);
    }
});

module.exports = studentRoute;