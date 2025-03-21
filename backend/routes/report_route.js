const router = require("express").Router();

let Report = require("../models/c_report");


//Fetching data from the frontend
router.route("/newcrime").post((req,res) =>{
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;


    const newCrime = new Report({
        name,
        phone,
        gender
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
    Report.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;