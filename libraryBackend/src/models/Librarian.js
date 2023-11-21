const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Librarian = new Schema({
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName :{
        type: String
     },
     librarianId:{
        type: String
     },
     street:{
        type: String
     },
     zipCode:{
        type: String
     },
     city:{
        type: String
     },
     state:{
        type: String
     }
},
{
    collection : 'librarians'
});

module.exports = mongoose.model('Librarian', Librarian);