const User = require('../models/User');

  
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
      const updateUser = await User.findByIdAndUpdate(
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
          data: updateUser,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error , try again" });
    }
  };
  
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "successfully deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete" });
    }
  };
  
  const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
      const User = await User.findById(id);
      res.status(200).json({ success: true, message: "Found", data: User });
    } catch (error) {
      res.status(500).json({ success: false, message: "Not found" });
    }
  };
  
  const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page);
    try {
      const tUser = await User.find({})
        .skip(page * 8)
        .limit(8);
      res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: tUser,
          count: tUser.length,
        });
    } catch (err) {
      res.status(500).json({ success: true, message: "not found" });
    }
  };

  module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers
  }