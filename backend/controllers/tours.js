const Tour = require("../models/Tour");

const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error , try again" });
  }
};

const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updateTour,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error , try again" });
  }
};

const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({ success: true, message: "Found", data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({}).populate("reviews")
      .skip(page * 8)
      .limit(8);
    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: tours,
        count: tours.length,
      });
  } catch (err) {
    res.status(500).json({ success: true, message: "not found" });
  }
};

const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize},
    }).populate('reviews');
    res.status(200).json({success : true , message : 'successful',data:tours})
  } catch (error) {
    res.status(404).json({success : false , message : 'not found'});
  }
};

const getFeaturedTour = async (req,res) =>{
    try {
        const featuredTours = await Tour.find({featured : true}).populate("reviews").limit(8);
        res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: featuredTours,
        count: featuredTours.length,
      });
    } catch (error) {
        res.status(404).json({ success: true, message: "not found" });
    }
}

const getTourCount = async (req,res) =>{
    try {
        const tours = await Tour.estimatedDocumentCount();
        res.status(200).json({success : true , data : tours})
    } catch (error) {
        res.status(500).json({success : true , message : 'Failed to fetch'});
    }
}

module.exports = {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTours,
  getTourBySearch,
  getFeaturedTour,
  getTourCount
};
