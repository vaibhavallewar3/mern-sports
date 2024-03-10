const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: ".env" });

const Connect = require("./utils/connect");
const errMid = require("./middleware/errMid");
const userRoute = require("./routes/user");
const teamRoute = require("./routes/team");
const eventRoute = require("./routes/event");

Connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, resp) => {
    resp.send(`<h1>App Started...</h1>`);
});

// Routing
app.use("/api/v1/user", userRoute);
app.use("/api/v1/team", teamRoute);
app.use("/api/v1/event", eventRoute);


// Error Handling Middleware
app.use(errMid);

app.listen(process.env.PORT);
console.warn(`Server Started : http://localhost:${process.env.PORT}`);