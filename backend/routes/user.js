const express = require('express');
const { updateUser, deleteUser, getSingleUser, getAllUsers } = require('../controllers/user');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.put("/:id",verifyUser ,updateUser);
router.delete("/:id",verifyUser, deleteUser);
router.get("/:id",verifyUser, getSingleUser);
router.get("/", verifyAdmin,getAllUsers);

module.exports = router;