const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require('./controllers/routes/apiRoutes');
const htmlRoutes = require('./controllers/routes/htmlRoutes');


const PORT = process.env.PORT || 3000;

// const db = require("./models");
// const { get } = require("http");

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

//apiRoutes middleware apply's the api routes in controllers to the app
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
