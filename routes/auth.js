// register new account
const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser } = require("../controllers/auth");
const { adminAuth } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);

// Admin access only
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);
module.exports = router;
