const Workout = require("../../models/Workout");
const express = require("express");
const router = express.Router();
const { get } = require("http");

// CREATE A NEW WORKOUT
router.post("/api/workouts", ({ body }, res) => {
  try {
    Workout.create(body).then((workout) => {
      console.log(workout);
      res.json(workout);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400).json(err);
  }
});

// FIND WORKOUTS
router.get("/api/workouts", async (req, res) => {
  try {
    // Workout.find({}).then((workout) => {
    //   res.json(workout);
    // });

    const workoutData = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration'
          }
        }
      }
    ])
    res.json(workoutData);

  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
});

// ADD WORKOUT BY ID PUSH INTO AN ARRAY
router.put("/api/workouts/:id", async ({ params, body }, res) => {
  try {
    const results = await Workout.findByIdAndUpdate(
      params.id,
      {
        $push: { exercises: body },
      },
      { new: true, runValidators: true }
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
});

// STATS PAGE
// VIEW COMBINED WEIGHT OF LAST SEVEN WORKOUTS ON STATS
// VIEW TOTAL DURATION OF LAST SEVEN WORKOUTS ON STATS

// ROUTES TO CREATE & FIND STATS --RANGE --------
router.get("/api/workouts/range", async (req, res) => {
  try {
    const workoutData = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration'
          }
        }
      }
    ])
    .sort({_id: -1})
    .limit(7)
    res.json(workoutData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
});

router.post("/api/workouts/range", async (req, res) => {
  try {
    Workout.create({}).then((workout) => {
      res.json(workout);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
});

module.exports = router;
