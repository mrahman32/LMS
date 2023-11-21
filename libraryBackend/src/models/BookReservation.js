const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookReservation = new Schema({
    bookId: {
        type: String
    },
    studentId: {
        type: String
    },
    librarianId: {
        type: String
    },
    fromDate: {
        type: Date
    },
    toDate: {
        type: Date
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    bookName:{
        type: String
    },
    studentName:{
        type: String
    },
    librarianName:{
        type: String
    }

},
    {
        collection: 'bookReservations'
    });

module.exports = mongoose.model('BookReservation', BookReservation);