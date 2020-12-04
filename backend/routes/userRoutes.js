const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").delete(protect, admin, deleteUser);
module.exports = router;
