const express = require('express');
const app = express();
const path = require('path');

/********************* Server **************************/ 
require('dotenv').config();
let Port = process.env.PORT || 5001; 
app.listen( Port , () => console.log(`listen to port : ${ Port }`) );

/********************* Middlewares **************************/
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/********************* Routes **************************/
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');
app.use('/', authRoute);
app.use('/profile', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/payment', paymentRoute);
app.use('/order', orderRoute);

/********************* DataBase **************************/
const mongoose = require('mongoose'); 
mongoose.connect( process.env.NODE_ENV === "production" ? process.env.MONGO_URI : "mongodb://localhost/MedStore" , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then( () => console.log('connected to db'))
    .catch( () => console.error('db not connected'))

/********************* Deploy **************************/
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')));  
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}
