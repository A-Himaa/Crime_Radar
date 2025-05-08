// packages import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// port allocation
const PORT = process.env.PORT || 8070;


//middleware
app.use(cors());
app.use(express.json()); // Replaced bodyParser.json() with express.json() (since it's built-in)

// database link variable decleartion
const URL = process.env.mongodb;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("🍃MongoDB Connection Success !");
});

//Chiyaan
const authRouter = require("./routes/auth.js");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.js");
app.use("/user", userRouter);



  
app.use(express.json());


//Himaa
const reportRouter = require("./routes/report_route.js");
app.use("/report",reportRouter);


//Taviii
const locationRouter = require('./routes/locations.js');
app.use('/locations', locationRouter);

const mapRouter = require('./routes/crime.js');
app.use('/map', mapRouter);

//Madhusha
const articleRouter = require("./routes/articleRoute.js");
app.use("/article", articleRouter);

console.log("📌 Location routes are mounted at: /locationList"); 

// server port allocation & server start
app.listen(PORT, () => {
    console.log(`🚀Server is up and running at port: ${PORT}`);
  });