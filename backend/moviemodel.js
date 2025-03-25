import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  review: String,
  rating: Number,
  reviewer: String,
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
