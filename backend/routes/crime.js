// routes/crime.js

const router = require("express").Router();
const ReportModel = require("../models/c_report");
const LocationModel = require("../models/location");

// GET /api/crimes
router.get("/crimeDetails", async (req, res) => {
  try {
    const data = await ReportModel.aggregate([
      // match additional query params later if you like
      {
        $lookup: {
          from: "locations",               // the MongoDB collection name
          localField: "district",          // field in crimes
          foreignField: "locationName",    // field in locations
          as: "locationDocs"
        }
      },
      {
        $unwind: {
          path: "$locationDocs",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          coordinates: "$locationDocs.coordinates"  // inject coords at root
        }
      },
      {
        $project: {
          locationDocs: 0  // drop the nested array
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
