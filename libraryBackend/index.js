let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./database/db');

//database connectivity
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected successfully!');
},error =>{
    console.log('Database error: '+error);
});

//Making port and server

const bookRoute = require('./src/routes/book.routes');
const studentRoute = require('./src/routes/student.routes');
const librarianRoute = require('./src/routes/librarian.routes');
const bookReservationRoute = require('./src/routes/book-reservation.routes');
const { log } = require('console');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(cors());

//static path
app.use(express.static(path.join(__dirname, 'dist/Library')));
//Api Root
app.use('/api-book',bookRoute);
app.use('/api-student',studentRoute);
app.use('/api-librarian',librarianRoute);
app.use('/api-book-reservation',bookReservationRoute);
//PORT Create
const port = process.env.port || 8000;
app.listen(port, ()=>{
    console.log('Listening port on: '+port);
});

//404 error handler
app.use((req,res,next)=>{
    next(createError(404));
});
//Base route
app.get('/',(req,res)=>{
    res.send('invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/Library/index.html'));
});

//print message and status if any error occured
app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

console.log("Hello wolrd");
