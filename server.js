require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler")
const verfiyJWT = require("./middleware/verfiyJWT");
const credentials = require("./middleware/credentails");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbViena");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

app.use(logger);
// Handle options credentials check - before CORS!
app.use(credentials)
// Cros Origin Source Sharing
app.use(cors(corsOptions));
// custom for all routes
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser() );
app.use('/', require("./routes/root"))
app.use('/', express.static(path.join(__dirname, "/public")));
app.use('/register', require("./routes/register"));
app.use("/subdir", require("./routes/subdir"));
app.use('/subdir', express.static(path.join(__dirname, "/public")));
app.use("/login", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verfiyJWT);
app.use("/employees", require("./routes/api/employees"));
app.all("*", (req,res) => {
    res.status(404);
    if(req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"))
    else if(req.accepts("json")) res.json({ error: "404 not Found" })
    else res.type('txt').send("404 Not Found");
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT,() => console.log(`Server Running on Port ${PORT}`));
});