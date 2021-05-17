
const Workout = require("../../models/Workout")
const express = require("express");
const router = express.Router();


 // SUBMIT A NEW WORKOUT
router.post("/api/workouts", ({ body }, res) => {
    try {
    Workout.create(body)
      .then((workout) => {
        console.log(workout);
        res.json(workout);
      })
    }catch(err){
        console.log(err);
        res.sendStatus(400).json(err);
      }
  });
  
  // FIND PREVIOUS WORKOUT
  router.get("/api/workouts", async (req, res) => {
    try {
    Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
    }
    catch(err){
        console.log(err)
        res.sendStatus(500).json(err);
      }
  });

  // UPDATE WORKOUT BY ID PUSH INTO AN ARRAY
router.put("/api/workouts/:id", async ({ params, body }, res) => {
    try{
      const results = await Workout.findByIdAndUpdate(params.id, {
        $push: { exercises: body },
      });
      res.json(results);
    }catch(err){
      console.log(err)
      res.sendStatus(500).json(err)
    }
  });
  
module.exports = router;