// packages import
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// port allocation
const PORT = process.env.PORT || 8070;

//middleware
app.use(cors());
app.use(bodyParser.json());

// database link variable decleartion
const URL = process.env.MONGODB_URI;

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
app.use("/report",reportRouter)


//Taviii
const locationRouter = require("./routes/locations.js");
app.use("/location", locationRouter);

console.log("📌 Location routes are mounted at: /locationList"); 

// server port allocation & server start
app.listen(PORT, () => {
    console.log('🚀Server is up and running at port: ${PORT}');
  });

