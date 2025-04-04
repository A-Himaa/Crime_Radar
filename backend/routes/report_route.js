const router = require("express").Router();
const express = require("express");

const multer = require("multer");
const path = require("path");

const pdfdocument = require("pdfkit");
const fs = require("fs");

const nodemailer = require("nodemailer");



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
    const NIC = req.body.NIC;
    const type = req.body.type;
    const severity = req.body.severity;
    const datetime = req.body.datetime;
    const district = req.body.district;
    const description = req.body.description;

    let image = null;
    if (req.file) {
        image = {
            filename: req.file.filename,
            contentType: req.file.mimetype,
        };
    }


    const newCrime = new ReportModel({
            anonymous,
            name,
            email,
            contactNo,
            NIC,
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


//Retrieve images
router.use("/images", express.static("uploads"));


//Generate Report
router.post("/generate-report", (req, res) => {
  const report = req.body;
  const _id =  report._id; 

  const doc = new pdfdocument();

  const filePath = path.join(__dirname, '../reportpdf', `report_${_id}.pdf`);
  const writeStream = fs.createWriteStream(filePath);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=crime_report.pdf`);

  doc.pipe(writeStream);
  doc.pipe(res);


//Styling

const topMargin = 12;

doc.rect(7, 7, doc.page.width - 17, doc.page.height - 17)
   .lineWidth(1)  
   .strokeColor('#131313')  
   .stroke();

doc.fillColor('#471f00')  
   .rect(12, topMargin, doc.page.width - 27, 70)
   .fill();  


const logoPath = path.join(__dirname, "../../frontend/src/Images/Logo.png");

doc.image(logoPath, 20, 15, { width: 80 })

doc.moveDown();  
doc.moveDown();
doc.moveDown();



doc.fillColor('#1a0b00')  
   .fontSize(20)
   .font('Helvetica-Bold')
   .text('Crime Incident Report', 30, topMargin + 80, { align: 'center' });

doc.font('Helvetica');

  

const tableTop = topMargin + 120; 
const col1X = 50; //
const col2X = 230; //
const colWidth1 = 180;
const colWidth2 = 300; 
const lineColor = '#616161'; 
let currentY = tableTop;

const drawRow = (label, value) => {
    const textHeight = Math.max(
        doc.heightOfString(label, { width: colWidth1 - 20 }),
        doc.heightOfString(value, { width: colWidth2 - 20 })
    ) + 15; 

   
    doc.strokeColor(lineColor)
       .lineWidth(1)
       .rect(col1X, currentY, colWidth1, textHeight)
       .rect(col2X, currentY, colWidth2, textHeight)
       .stroke();

    // Add text inside the cells
    doc.fillColor('#000000')
       .fontSize(12)
       .text(label, col1X + 10, currentY + 5, { width: colWidth1 - 20 })
       .text(value, col2X + 10, currentY + 5, { width: colWidth2 - 20 });

    currentY += textHeight; // Move down for next row
};


drawRow('Serial No.', report._id);
drawRow('Date', new Date(report.createdAt).toLocaleString());

drawRow('Anonymous', report.anonymous === true? "Yes":"No");
drawRow('Reported By', report.name);
drawRow('Email', report.email);
drawRow('Contact No.', report.contactNo);
drawRow('NIC No.', report.NIC);


drawRow('Crime Type:', report.type);
drawRow('Severity:', report.severity);
drawRow('Incident Date:', new Date(report.datetime).toLocaleString());
drawRow('District:', report.district);
drawRow('Description:', report.description);

drawRow('Evidence:', report.image ? 'Available' : 'None');

doc.end();

writeStream.on('finish', () => {
  console.log(`PDF generated and saved as report_${_id}.pdf`);
});

})


// Email Forwarding
const SENDGRID_API_KEY = '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'; 

router.post("/send-report", async (req, res) => {
  const { recipientEmail, id } = req.body;


  const filePath = path.join(__dirname, '../reportpdf', `report_${id}.pdf`);
  console.log("File Path:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(400).send('Report does not exist. Please generate the report first.');
  }

  // Set up the transporter to use SendGrid SMTP
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',  
    auth: {
      user: 'apikey', 
      pass: SENDGRID_API_KEY, 
    },
  });

  // let attachmentContent = Buffer.isBuffer(reportData) ? reportData : Buffer.from(reportData, 'base64');

  // Create the email content
  const mailOptions = {
    from: 'akilahimaja@hotmail.com',  
    to: recipientEmail,  
    subject: 'Crime Report Details',
    text: `Dear Sir/Madam,
  
  Please find attached the crime incident report as requested.
  If you have any questions, feel free to reach out.
  
  Best regards,
  Crime Radar Team`,

  attachments: [
    {
      filename:  `report_${id}`,
      path: filePath,
    },
  ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Report sent successfully.');
  });
});





module.exports = router;