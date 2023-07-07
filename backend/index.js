require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const toursRoutes = require('./routes/tours');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const bookingRoutes = require('./routes/booking');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/tours',toursRoutes);
app.use('/users',userRoutes);
app.use('/auth',authRoutes);
app.use('/reviews/',reviewRoutes);
app.use('/booking',bookingRoutes);


const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database");
    }catch(err){
        console.log('Couldnt connect to database')
    }
}

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    connect();
    console.log(`Server listening on port ${port}...`)
})