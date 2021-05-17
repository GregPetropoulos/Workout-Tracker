const express = require("express");
const path = require("path");
// const Workout = require("../../models/Workout")
const router = express.Router();

// ADD A NEW EXERCISE TO A NEW WORKOUT
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/exercise.html"));
  });
module.exports = router;
