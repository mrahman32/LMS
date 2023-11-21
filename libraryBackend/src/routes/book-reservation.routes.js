const express = require('express');
const app = express();
const bookReservationRoute = express.Router();

let BookReservation = require('../models/BookReservation');
let Book = require('../models/Book');
let Student = require('../models/Student');
let Librarian = require('../models/Librarian');

// bookReservationRoute.route('/add-book-reservation').post((req, res, next) => {
//     BookReservation.create(req.body)
//     .then((result)=>{
//         res.json(result);
//     })
//     .catch((err)=>{
//         return next(err);
//     })
// });

bookReservationRoute.route('/add-book-reservation').post(async (req, res, next) => {
    try {
        // Create the book reservation
        const newReservation = await BookReservation.create(req.body);

        // Update the book's reservationQuantity by incrementing it by 1
        await Book.findOneAndUpdate(
            { _id: req.body.bookId }, // Assuming book_id is the field in req.body representing the book's ID
            { $inc: { reservedQty: 1 } } // Increment the reservationQuantity by 1
        );

        res.json(newReservation);
    } catch (err) {
        return next(err);
    }
});


// bookReservationRoute.route('/').get((req, res, next) => {
//     BookReservation.find()
//     .then((result)=>{
//         res.json(result);
//     })
//     .catch((err)=>{
//         return next(err);
//     });
// });

bookReservationRoute.route('/').get(async (req, res, next) => {
    try {
        const reservations = await BookReservation.find();

        // Create arrays to store the promises for fetching related data
        const bookPromises = reservations.map(reservation => Book.findById(reservation.bookId));
        const studentPromises = reservations.map(reservation => Student.findById(reservation.studentId));
        const librarianPromises = reservations.map(reservation => Librarian.findById(reservation.librarianId));

        // Wait for all the promises to resolve
        const books = await Promise.all(bookPromises);
        const students = await Promise.all(studentPromises);
        const librarians = await Promise.all(librarianPromises);

        // Combine the reservation data with book names, student names, and librarian names
        const results = reservations.map((reservation, index) => ({
            id: reservation._id,
            bookName: books[index] ? books[index].name : null,
            studentName: students[index] ? `${students[index].firstName} ${students[index].lastName}` : null,
            librarianName: librarians[index] ? `${librarians[index].firstName} ${librarians[index].lastName}` : null,
            fromDate: reservation.fromDate,
            toDate: reservation.toDate,
            isComplete: reservation.isComplete,
            bookId: reservation.bookId,
            studentId: reservation.studentId,
            librarianId: reservation.librarianId,
            // Add other fields from the reservation as needed
        }));

        res.json(results);
    } catch (err) {
        return next(err);
    }
});



bookReservationRoute.route('/read-book-reservation/:id').get((req, res, next) => {
    BookReservation.findById(req.params.id)
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});


bookReservationRoute.route('/update-reservation/:id').put((req, res, next) => {
    BookReservation.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});

bookReservationRoute.route('/complete-book-reservation').post(async (req, res, next) => {
    try {

        // Update the book's reservationQuantity by decrementing it by 1
        await Book.findOneAndUpdate(
            { _id: req.body.bookId }, // Assuming book_id is the field in req.body representing the book's ID
            { $inc: { reservedQty: -1 } } // Decrement the reservationQuantity by 1
        );

        // Update the corresponding book reservation's isComplete property to true
        await BookReservation.findOneAndUpdate(
            { _id: req.body.id }, // Assuming there's a field bookId in the BookReservation model
            { $set: { isComplete: true } }
        );

        res.json({ message: 'Reservation completed successfully.' });

    } catch (err) {
        return next(err);
    }
});


bookReservationRoute.route('/delete-reservation/:id').delete((req, res, next) => {
    BookReservation.findByIdAndRemove(req.params.id)
        .then((result) => {
            return res.status(200).json({
                msg: result
            })
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = bookReservationRoute;