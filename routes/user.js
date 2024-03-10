const express = require("express");
const { isAuthenticatedUser, isAutherizedRole } = require("../middleware/auth");
const { registerUser, loginUser, logoutUser, myProfile, updateMyProfile, updateUserRole } = require("../controllers/user");


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticatedUser, logoutUser);

router.get("/myprofile", isAuthenticatedUser, myProfile);

router.put("/update/profile", isAuthenticatedUser, updateMyProfile);

router.put("/update/role/:id", isAuthenticatedUser, isAutherizedRole("super"), updateUserRole);

module.exports = router;