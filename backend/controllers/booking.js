const Booking = require('../models/Booking');

const createBooking = async (req,res) =>{
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(201).json({success : true , message : "booked",data : savedBooking}) 
    } catch (error) {
        res.status(500).json({success : false , message : 'internal server error'})
    }
}

const getSingleBooking = async (req,res) =>{
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);
        res.status(200).json({success : true , message : "successful",data : book});
    } catch (error) {
        res.status(500).json({success : false , message : 'internal server error'});
    }
}

const getAllBookings = async (req,res) =>{
    try {
        const books = await Booking.find();
        res.status(200).json({success : true , message : "successful",data : books});
    } catch (error) {
        res.status(500).json({success : false , message : 'internal server error'});
    }
}

module.exports = {createBooking,getSingleBooking,getAllBookings}