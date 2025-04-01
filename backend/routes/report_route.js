const router = require("express").Router();

const multer = require("multer");
const path = require("path");

// Define storage settings for the uploaded image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // Store uploaded images in 'uploads' folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique file name
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Store with original file extension
    }
  });

// Create a multer upload instance
const upload = multer({ storage: storage });


let ReportModel = require("../models/c_report.js");


//Fetching data from the frontend
router.route("/newcrime").post(upload.single('image'), (req, res) => {
    const anonymous = req.body.anonymous;
    const name = req.body.name;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const nic = req.body.nic;
    const type = req.body.type;
    const severity = req.body.severity;
    const datetime = req.body.datetime;
    const district = req.body.district;
    const description = req.body.description;

    let image = {};
    if (req.file) {
        image = {
            data: req.file.filename,
            contentType: req.file.mimetype,
        };
    }


    const newCrime = new ReportModel({
            anonymous,
            name,
            email,
            contactNo,
            nic,
            type,
            severity,
            datetime,
            district,
            description,
            image,
    });


    //Passing data to database(Create)
    newCrime.save().then(()=>{
        res.json("Crime Report added successfully")
    }).catch((err)=>{
        console.log(err);
    })

})



//Retrive crime data
router.route("/crimeDetails").get((req,res)=>{
    ReportModel.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})


//Retrieve specific crime data
router.get('/crimeDetails/:id', async (req, res) => {
    const reportId = req.params.id;

    try {
        // Query the database to find the document with the reportId
        const reportDetails = await ReportModel.findById(reportId);
    
        if (!reportDetails) {
          return res.status(404).json({ message: 'Data not found' });
        }
    
        res.json(reportDetails);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})


module.exports = router;