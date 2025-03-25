const express = require("express");
const router = express.Router();
const Location = require("../models/Location");


//create
router.route("addLocation").post((req,res)=>{
    const location = req.body.location;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const newLocation = new Location({
        location,
        latitude,
        longitude
    })

    newLocation.save().then(()=>{
        res.json("Location Saved Successfully!!");
    }).catch((err)=>{
        console.log(err);
    });
});


//read
router.route("/").get(async(req,res)=>{
    Location.find().then((LocationRoutes)=>{
        res.json(LocationRoutes);
    }).catch((err)=>{
        console.log(err);
    })
})


//update
router.route("updateLocation/:id").put(async(req,res)=>{
    const {id} = req.params;
    const{location,latitude,longitude} = req.body;

    const updateLocation = {
        location,
        latitude,
        longitude
    };

    try {
        const update = await location.findByIdAndUpdate(id, updateLocation);
        if (!update) {
            return res.status(404).send({ status: "Location not found" });
        }
        res.status(200).send({ status: "Location Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});


//fetch
router.route("/get/:id").get(async (req, res) => {
    const locationId = req.params.id;
    try {
        const location = await location.findById(locationId);
        if (!location) {
            return res.status(404).send({ status: "Location not found" });
        }
        res.status(200).send({ status: "Location Fetched", location });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting location", error: err.message });
    }
});


 //delete
 router.route("/delete/:id").delete(async(req, res)=>{
    let locationId = req.params.id;
    await location.findByIdAndDelete(locationId)
    .then(()=> {
        res.status(200).send({status: "Location deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting the location", error:err.message});
    })
 })

module.exports = router;