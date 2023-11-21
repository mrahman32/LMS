const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName :{
        type: String
     },
     studentId:{
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
    collection : 'students'
});

module.exports = mongoose.model('Student', Student);