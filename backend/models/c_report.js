const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    anonymous : {
        type : String,
        required: false
    },
    name : {
        type : String,
        required: false
    },
    email : {
        type : String,
        required: false
    },
    contactNo : {
        type : String,
        required: false
    },
    NIC : {
        type : String,
        required: false
    },
    type : {
        type : String,
        required: true
    },
    severity : {
        type : String,
        required: true
    },
    datetime : {
        type : Date,
        required: true
    },
    district : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    image : {
        type : String,
        required: false
    },
})

reportSchema.methods.toJSON = function() {
    const obj = this.toObject();
    return obj;
};


const c_report = mongoose.model("crimedata",reportSchema);

module.exports = c_report;