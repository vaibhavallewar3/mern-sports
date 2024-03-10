const Event = require("../models/event");
const ErrorHandler = require("../utils/errHandle");


exports.addEvent = async (req, resp, next) => {
    try {
        const { title, description, start, end, address: { street, city, pinCode }, type, price: { first, second, third } } = req.body;

        const event = await Event.create({ title, description, start, end, address: { street, city, pinCode }, type, price: { first, second, third }, organiser: req.user.team });
        resp.status(200).json({ success: true, message: `${event.title} Created Successfully...` });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllEvents = async (req, resp, next) => {
    try {
        const events = await Event.find({});

        resp.status(200).json({ success: true, events });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};

exports.getEventById = async (req, resp, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event){
            return next(new ErrorHandler("Event Not Found!", 404));
        };

        resp.status(200).json({ success: true, event });
    } catch (error) {
        resp.status(500).json({ success: false, message: error.message });
    }
};