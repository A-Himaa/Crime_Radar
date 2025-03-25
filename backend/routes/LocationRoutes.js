const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

//POST: Save location Data
router.post("/addLocation", async (req,res) => {
    try{
        const {name, latitude, longitude } = req.body;
        const newLocation = new Location ({name, latitude, longitude});
        await newLocation.save();
        res.status(201).json({message:"Location saved successfully"});
    }catch (error){
        res.status(500).json({error: error.message});
    }
});


//GET: Fetch all location data
router.get("/", async (req,res) =>{
    try{
        const locations = await Location.find();
        res.status(200).json(locations);
    }catch (error){
        res.status(500).json({error:error.message});
    }
});

module.exports = router;