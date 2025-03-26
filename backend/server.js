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
  //   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("🍃MongoDB Connection Success !");
});



//Himaa
const reportRouter = require("./routes/report_route.js");
app.use("/report", reportRouter);





// server port allocation & server start
app.listen(PORT, () => {
    console.log(`🚀Server is up and running at port: ${PORT}`);
  });

