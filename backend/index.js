import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB Connection Error: ', err);
    process.exit(1); // Exit if unable to connect
  });

// Movie Schema
import Movie from './moviemodel.js';

// API Routes
app.post("/add-review", async (req, res) => {
  try {
    const { title, review, rating, reviewer } = req.body;
    const newMovie = new Movie({ title, review, rating, reviewer });
    await newMovie.save();
    res.json({ message: "Review Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/get-reviews", async (req, res) => {
  try {
    const reviews = await Movie.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/movies-starting-with-a", async (req, res) => {
  try {
    const movies = await Movie.find({ title: { $regex: /^A/i } }); // Case insensitive
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/movies-ending-with-y", async (req, res) => {
  try {
    const movies = await Movie.find({ title: { $regex: "^.*y$", $options: "i" } });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/movie-count", async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    res.json({ totalMovies: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/highly-rated-movies", async (req, res) => {
  try {
    const count = await Movie.countDocuments({ rating: { $gte: 8 } });
    res.json({ highlyRatedMovies: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/remove-bad-movies", async (req, res) => {
  try {
    await Movie.deleteMany({ rating: { $lt: 3 } });
    res.json({ message: "Low-rated movies removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/search-movie", async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const movies = await Movie.find({ title: { $regex: title, $options: "i" } });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/reviews-by-aditya", async (req, res) => {
  try {
    const reviews = await Movie.find({ reviewer: "aditya" });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
