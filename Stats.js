const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  totalWeight: {
    type: Number,
    required: [true, "Total Distance in Miles Required"],
  },
  totalDuration: {
    type: Number,
    required: [true, "Total Duration in Minutes Required"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Stats = mongoose.model("Stats", StatSchema);

module.exports = Stats;
