const express = require("express");
const { isAuthenticatedUser, isAutherizedRole } = require("../middleware/auth");
const { addEvent, getAllEvents, getEventById } = require("../controllers/event");


const router = express.Router();

router.post("/add", isAuthenticatedUser, isAutherizedRole("admin"), addEvent);

router.get("/get", isAuthenticatedUser, getAllEvents);

router.get("/get/:id", isAuthenticatedUser, getEventById);

module.exports = router;