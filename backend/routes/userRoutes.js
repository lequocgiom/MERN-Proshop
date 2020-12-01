const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser);

module.exports = router;
