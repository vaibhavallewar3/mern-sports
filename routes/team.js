const express = require("express");
const { isAuthenticatedUser, isAutherizedRole } = require("../middleware/auth");
const { createTeam, getTeams, getTeamById, addMember, removeMember } = require("../controllers/team");


const router = express.Router();

router.post("/create", isAuthenticatedUser, createTeam);

router.get("/get", isAuthenticatedUser, isAutherizedRole("super"), getTeams);

router.get("/get/:id", isAuthenticatedUser, getTeamById);

router.put("/member/add/:id", isAuthenticatedUser, addMember);

router.put("/member/remove/:id", isAuthenticatedUser, isAutherizedRole("admin"), removeMember);

module.exports = router;