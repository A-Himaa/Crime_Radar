const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number], // Array of numbers [latitude, longitude]
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length === 2; // Ensure exactly two elements
      },
      message: "Coordinates should contain exactly two numbers (latitude and longitude)."
    }
  }
});

const location = mongoose.model('Location', locationSchema);

module.exports = location;