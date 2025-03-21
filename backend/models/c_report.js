const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    phone : {
        type : String,
        required: true
    },
    gender : {
        type : String,
        required: true
    }
})


const c_report = mongoose.model("crimedata",reportSchema);

module.exports = c_report;