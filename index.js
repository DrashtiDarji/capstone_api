const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();



//custome Routes

const userRouter = require('./routes/user');
const foodRouter = require('./routes/food');
const orderRouter = require('./routes/order');

//Middleware inclusion
app.use(cors());
app.use(express.json());


//to allowe below folder/resources to be accesable from server side
app.use('/pics/postimages', express.static('./food_content'));


//setting up database connection
mongoose.connect("mongodb://localhost:27017/capstone")
.then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.log(err);
});


//setting up routes

app.use('/users',userRouter);
app.use('/foods',foodRouter);
app.use('/orders',orderRouter);


app.listen(8000,()=>{
    console.log("Server is up and running");
});