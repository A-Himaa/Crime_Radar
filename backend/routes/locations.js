const router = require("express").Router();
const Location = require("../models/location");

router.route("/newLocation").post((req, res) => {
    const { location, latitude, longitude } = req.body;

    const newLocation = new Location({ location, latitude, longitude });

    newLocation.save()
        .then(() => res.status(201).json({ message: "Location Added Successfully" }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;