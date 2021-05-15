const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require ("./models");
// const Workout = require("./models/Workout.js");

// ENVIRONMENT EXPRESS SET UP 
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// SET UP MONGOOSE CONNECT
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// CREATE DB


// db.Workout.create({Workout})
// .then(dbWorkout => {
//     console.log(dbWorkout)
// })
// .catch(({ message }) => {
//     console.log("Hit", message)
// });


// ROUTES
// CREATE A NEW WORKOUT
app.post("/submit", ({ body }, res) => {
  db.Workout.create(body)
    .then((workout) => {
      res.status(201).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// FIND PREVIOUS WORKOUT
app.get("/workout", (req, res) => {
    db.Workout.find({})
      .then(workout => {
        res.json(workout);
     })
      .catch(err => {
        res.json(err);
      });
  });

//   UPDATE A WORKOUT



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
