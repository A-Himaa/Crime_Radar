const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Create location
router.post("/addLocation", async (req, res) => {
    try {
        console.log("Received Data: ", req.body); // Debugging
        const { locationName, coordinates } = req.body;

        const newLocation = new Location({ 
            locationName, 
            coordinates: [
                parseFloat(coordinates[0]), 
                parseFloat(coordinates[1])
            ],
        });

        // Save to database
        await newLocation.save();
        res.status(201).json({ message: "Location added successfully", newLocation });
    } catch (err) {
        console.error("Error saving location:", err);
        res.status(500).json({ error: "Failed to save location" });
    }
});

// Fetch all locations
router.get("/locationList", async (req, res) => {
    try {
        const locations = await Location.find(); // Fetch from DB
        console.log("Fetched Locations:", locations); // Debugging log
        res.json(locations); // Send response
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Server error while fetching locations" });
    }
});

// Update location
router.put("/updateLocation/:id", async (req, res) => {
    const { id } = req.params;
    const { locationName, latitude, longitude } = req.body;

    const updateLocation = {
        locationName,
        coordinates: [parseFloat(latitude), parseFloat(longitude)]
    };

    try {
        const update = await Location.findByIdAndUpdate(id, updateLocation, { new: true });
        if (!update) {
            return res.status(404).json({ status: "Location not found" });
        }
        res.status(200).json({ status: "Location Updated", updatedLocation: update });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

// Fetch single location
router.get("/getLocation/:id", async (req, res) => {
    const locationId = req.params.id;
    try {
        const locationData = await Location.findById(locationId);
        if (!locationData) {
            return res.status(404).json({ status: "Location not found" });
        }
        res.status(200).json({ status: "Location Fetched", locationData });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with getting location", error: err.message });
    }
});

// Delete location
router.delete("/delete/:id", async (req, res) => {
    const locationId = req.params.id;
    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ status: "Location not found" });
        }
        res.status(200).json({ status: "Location Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with deleting location", error: err.message });
    }
});

module.exports = router;
