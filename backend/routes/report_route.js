const router = require("express").Router();

let ReportModel = require("../models/c_report.js");


//Fetching data from the frontend
router.route("/newcrime").post((req,res) =>{
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
    const image = req.body.image;


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
    })


    //Passing data to database(Create)
    newCrime.save().then(()=>{
        res.json("Crime Report added successfully")
    }).catch((err)=>{
        console.log(err);
    })

})

//Retrive crime data
router.route("/crimedata").get((req,res)=>{
    ReportModel.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;