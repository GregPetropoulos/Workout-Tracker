const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    enum: ['resistance', 'cardio'],
    required: "Workout type is Required"
  },
  name: {
    type: String,
    trim: true,
    required: "Name of exercise Required"
  },
  
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
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

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;