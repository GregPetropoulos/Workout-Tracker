# Workout-Tracker
----------------
[**Deployed Link**](https://fittracker210518.herokuapp.com/)

[**GitHub Link**](https://github.com/GregPetropoulos/Workout-Tracker)




## mongoDB Aggregation Pipeline Stages
|Stage|Description|
-------|--------
|$addFields|Adds new fields to documents. Similar to $project, $addFields reshapes each document in the stream; specifically, by adding new fields to output documents that contain both the existing fields from the input documents and the newly added fields. $set is an alias for $addFields.|
|$sum|Calculates and returns the sum of numeric values. $sum ignores non-numeric values.
|$limit|Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document, outputs either one document (for the first n documents) or zero documents (after the first n documents).|
|$sort|Reorders the document stream by a specified sort key. Only the order changes; the documents remain unmodified. For each input document, outputs one document.|
------
**Link for Aggregations**
https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/

**See code in apiRoutes.js get request for use case**
```

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
```
I have added an additional field called TotalDuration dynamically into the Workout.js model. Inside the new new field is an object with the $sum as the key adding sum of numeric values in the exercises array at the duration.

**See code in the Workout.js below, specifically duration**
``` exercises: [
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

```

I had to use $sort to only see the last 7 days and not the first 7 days entered.
```
.sort({_id: -1})
```
Lastly, the $limit gave me the number of days to bring into the model.
```
.limit(7)
```

