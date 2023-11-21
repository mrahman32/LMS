const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    price: {
        type: mongoose.Decimal128
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    reservedQty: {
        type: Number
    },
    isbn: {
        type: String
    }

},
    {
        collection: 'books'
    });

module.exports = mongoose.model('Book', Book);