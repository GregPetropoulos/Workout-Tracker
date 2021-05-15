const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { get } = require("http");

// ENVIRONMENT EXPRESS SET UP
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// SET UP MONGOOSE CONNECT
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, //set this to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
});

// CREATE DB
// used on example
// db.Workout.create({Workout})
// .then(dbWorkout => {
//     console.log(dbWorkout)
// })
// .catch(({ message }) => {
//     console.log("Hit", message)
// });

// ROUTES
// SUBMIT A NEW WORKOUT
app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((workout) => {
      console.log(workout);
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// FIND PREVIOUS WORKOUT
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.put("/api/workouts/:id", async ({ params, body }, res) => {
  try{
    const results = await db.Workout.findByIdAndUpdate(params.id, {
      $push: { exercises: body },
    });
    res.json(results);
  }catch(err){
    console.log(err)
    res.sendStatus(500).json(err)
  }
});
// UPDATE A RECENT WORKOUT
// ADD A NEW EXERCISE TO A NEW WORKOUT
// VIEW COMBINED WEIGHT OF LAST SEVEN WORKOUTS ON STATS
// VIEW TOTAL DURATION OF LAST SEVEN WORKOUTS ON STATS

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
