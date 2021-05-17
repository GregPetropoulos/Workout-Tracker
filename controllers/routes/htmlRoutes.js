const express = require("express");
const router = express.Router();
const path = require("path");


// ADD A NEW EXERCISE TO A NEW WORKOUT PAGE
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/exercise.html"));
  });

  // DISPLAY MAIN PAGE
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  });
  
  // DISPLAYS STATS PAGE
  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/stats.html"));
  });

module.exports = router;
