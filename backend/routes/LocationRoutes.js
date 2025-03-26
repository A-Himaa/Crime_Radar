const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

// Create location
router.route("/addLocation").post((req, res) => {
    const { location, latitude, longitude } = req.body;

    const newLocation = new Location({ location, latitude, longitude });

    newLocation.save()
        .then(() => res.json("Location Saved Successfully!!"))
        .catch((err) => res.status(500).json({error:err.message}));
});

// Read all locations
router.route("/").get(async (req, res) => {
    Location.find()
        .then((locations) => res.json(locations))
        .catch((err) => console.log(err));
});

// Update location
router.route("/updateLocation/:id").put(async (req, res) => {
    const { id } = req.params;
    const { location, latitude, longitude } = req.body;

    try {
        const updatedLocation = await Location.findByIdAndUpdate(id, { location, latitude, longitude }, { new: true });
        if (!updatedLocation) {
            return res.status(404).send({ status: "Location not found" });
        }
        res.status(200).send({ status: "Location Updated", updatedLocation });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Fetch single location
router.route("/getLocation/:id").get(async (req, res) => {
    const locationId = req.params.id;
    try {
        const locationData = await Location.findById(locationId);
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
    try {
        await Location.findByIdAndDelete(locationId);
        res.status(200).send({ status: "Location deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting the location", error: err.message });
    }
});

module.exports = router;
