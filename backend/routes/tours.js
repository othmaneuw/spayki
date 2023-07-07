const express = require("express");
const {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTours,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} = require("../controllers/tours");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.post("/",verifyAdmin ,createTour);
router.put("/:id",verifyAdmin ,updateTour);
router.delete("/:id",verifyAdmin ,deleteTour);
router.get("/:id", getSingleTour);
router.get("/", getAllTours);
router.get("/search/getTourBySearch", getTourBySearch);
router.get('/search/getFeaturedTour',getFeaturedTour);
router.get('/search/getTourCount',getTourCount);

module.exports = router;
