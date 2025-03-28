const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Create location
router.route("/addLocation").post((req,res) =>{
    const locationName = req.body.locationName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const newLocation = new Location({ 
        locationName, 
        coordinates: [latitude, longitude],
    })

    newLocation.save().then(() => {
        res.json("Location Saved Successfully!!");
    }).catch((err) => {
        console.log(err);
    });
});

// Read all locations
router.route("/locationList").get(async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving locations");
    }
});

// Update location
router.route("/updateLocation/:id").put(async (req, res) => {
    const { id } = req.params;
    const { locationName, latitude, longitude } = req.body;

    const updateLocation = {
        locationName,
        coordinates: [latitude, longitude]
    };

    try {
        const update = await Location.findByIdAndUpdate(id, updateLocation);
        if (!update) {
            return res.status(404).send({ status: "Location not found" });
        }
        res.status(200).send({ status: "Location Updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Fetch single location
router.route("/getLocation/:id").get(async (req, res) => {
    const locationId = req.params.id;
    try {
        const locationData = await location.findById(locationId);
        if (!locationData) {
            return res.status(404).send({ status: "Location not found" });
        }
        res.status(200).send({ status: "Location Fetched", locationData });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting location", error: err.message });
    }
});

// Delete location
router.route("/delete/:id").delete(async (req, res) => {
    let locationId = req.params.id;
    await Location.findByIdAndDelete(locationId)
    .then(()=> {
        res.status(200).send({status: "Location Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stats: "Error with deleting location", error:err.message});
    })
 });

module.exports = router;
