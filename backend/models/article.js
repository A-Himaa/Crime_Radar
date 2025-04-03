const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const crimeCategories = [
    "Violent Crimes",
    "Cyber Crimes",
    "Property Crimes",
    "Drug-Related Crimes",
    "Robbery Crimes"
];

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const article = mongoose.model("Article", articleSchema);
module.exports = article;