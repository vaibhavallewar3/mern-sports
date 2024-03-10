const Team = require("../models/team");
const User = require("../models/user");
const ErrorHandler = require("../utils/errHandle");

exports.createTeam = async (req, resp, next) => {
    try {
        const { title, description, type, address: { street, city, pinCode } } = req.body;
        const user = await User.findById(req.user.id);

        const team = await Team.create({ title, description, type, address: { street, city, pinCode } });
        team.members.unshift(user._id);
        user.team = team._id;
        user.role = "admin";

        await user.save();
        await team.save();
        resp.status(200).json({ success: true, message: `${team.title} Created Successfully...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.addMember = async (req, resp, next) => {
    try {
        const user = await User.findById(req.user.id).populate("team");
        const team = await Team.findById(req.params.id);
        if (!team) {
            return next(new ErrorHandler("Team Not Found!", 404));
        };
        if (user.team !== undefined) {
            return next(new ErrorHandler(`You Already Team Member of ${user.team.title}!`, 404));
        };

        if (team.type === "cricket" && team.members.length <= 11) {
            team.members.unshift(user._id);
            user.team = team._id;
        } else if (team.type === "hockey" && team.members.length <= 11) {
            team.members.unshift(user._id);
            user.team = team._id;
        } else if (team.type === "football" && team.members.length <= 11) {
            team.members.unshift(user._id);
            user.team = team._id;
        } else if (team.type === "kabaddi" && team.members.length <= 7) {
            team.members.unshift(user._id);
            user.team = team._id;
        } else if (team.type === "volleyball" && team.members.length <= 7) {
            team.members.unshift(user._id);
            user.team = team._id;
        } else if (team.type === "khokho" && team.members.length <= 9) {
            team.members.unshift(user._id);
            user.team = team._id;
        }
        else {
            return next(new ErrorHandler("Please Check Your Sports Type or Team Size is Full!", 500));
        };

        await user.save();
        await team.save();
        resp.status(200).json({ success: true, message: `${user.name} Added Successfully in ${team.title}...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.removeMember = async (req, resp, next) => {
    try {
        const member = await User.findById(req.params.id);
        const team = await Team.findById(req.user.team);
        if (!team) {
            return next(new ErrorHandler("Not Found Your Team!", 404));
        };
        if (!member) {
            return next(new ErrorHandler("Member Not Found!", 404));
        };

        team.members.splice(member, 1);
        member.team = undefined;
        await team.save();
        await member.save();

        resp.status(200).json({ success: true, message: `${member.name} Removed from ${team.title} Successfully...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.getTeams = async (req, resp, next) => {
    try {
        const teams = await Team.find({});

        resp.status(200).json({ success: true, teams });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.getTeamById = async (req, resp, next) => {
    try {
        const team = await Team.findById(req.params.id).populate("members");

        resp.status(200).json({ success: true, team });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};