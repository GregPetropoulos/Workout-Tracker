const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        enum: ["resistance", "cardio"],
        required: [true, "Workout type is Required"],
      },
      name: {
        type: String,
        trim: true,
        required: "Name of Exercise Required",
      },

      distance: {
        type: Number,
      },
      duration: {
        type: Number,
        required: [true, "Duration in Minutes Required"],
      },
      weight: {
        type: Number,
      }, 
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
    },
  ],
  // New totalDuration dynamically shows up here 
  // with the sum of last 7 days see apiRoutes line 67
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
