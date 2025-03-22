const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const crimeDetailsSchema = new Schema({

    crimeID: {
        type : Number,
        required : true
    },

    crimeType: {
        type : String,
        required : true
    },

    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    }


});

    crimeDetailsSchema.plugin(AutoIncrement, { inc_field: "crimeID" });
    crimeDetailsSchema.index({ location: "2dsphere" });
