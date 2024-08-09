const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

const User = require("../models/userModel"); // Adjust path as necessary

// DELETE /api/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
