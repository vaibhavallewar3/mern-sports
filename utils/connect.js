const mongoose = require("mongoose");


const Connect = () => {
    mongoose.connect(`${process.env.DB_CONNECT}`, { autoIndex: false, maxPoolSize: 10, serverSelectionTimeoutMS: 5000, socketTimeoutMS: 45000, family: 4 })
        .then((data) => {
            // console.log("Connected...");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = Connect;