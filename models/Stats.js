const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  type: {
    type: String,
    trim: true,
    enum: ['resistance', 'cardio'],
    required: [true,"Workout type is Required"]
  },
  name: {
    type: String,
    trim: true,
    required: "Name of Exercise Required"
  },
  
  distance: {
    type: Number,
    required: [true, "Distance in Miles Required"]
  },
  duration: {
    type: Number,
    required: [true,"Duration in Minutes Required"
  },
  weight: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

const Stats = mongoose.model("Stats", StatSchema);

module.exports = Stats;