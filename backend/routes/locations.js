const router = require("express").Router();

let location = require("../models/location");

//Fetching data from the frontend
router.route("/newLocation").post((req,res) =>{
    const location = req.body.location;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;


    const newLocation = new location({
        location,
        latitude,
        longitude
    })

    //Passing data to database(Create)
    newLocation.save().then(()=>{
        res.json("Location Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;