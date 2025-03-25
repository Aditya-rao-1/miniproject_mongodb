import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Frontpage = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [reviewer, setReviewer] = useState("");
    const [movieCount, setMovieCount] = useState(0);
    const [highlyRatedCount, setHighlyRatedCount] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");



  
    // Fetch all reviews
    useEffect(() => {
      fetchMovies();
      fetchCounts();
    }, []);
  
    const fetchMovies = () => {
      axios.get("http://localhost:8080/get-reviews")
        .then((res) => setMovies(res.data))
        .catch((err) => console.error("Error fetching reviews:", err));
    };
  
    const fetchCounts = () => {
        axios.get("http://localhost:8080/movie-count")
          .then((res) => {
            console.log("Total movies response:", res.data); // Debugging
            setMovieCount(res.data.totalMovies);
          })
          .catch((err) => console.error("Error fetching movie count:", err));
      
        axios.get("http://localhost:8080/highly-rated-movies")
          .then((res) => {
            console.log("Highly rated movies response:", res.data); // Debugging
            setHighlyRatedCount(res.data.highlyRatedMovies);
          })
          .catch((err) => console.error("Error fetching highly-rated count:", err));
      };
      
      const fetchReviewsByAditya = () => {
        axios.get("http://localhost:8080/reviews-by-aditya")
          .then((res) => setMovies(res.data))
          .catch((err) => console.error("Error fetching Aditya's reviews:", err));
      };
      
    const addReview = () => {
      if (!title || !review || !rating || !reviewer) {
        alert("All fields are required!");
        return;
      }
  
      axios.post("http://localhost:8080/add-review", { 
        title, 
        review, 
        rating: Number(rating), 
        reviewer 
      })
      .then(() => {
        fetchMovies();
        setTitle(""); setReview(""); setRating(""); setReviewer("");
      })
      .catch((err) => console.error("Error adding review:", err));
    };
  
    const fetchMoviesStartingWithA = () => {
      axios.get("http://localhost:8080/movies-starting-with-a")
        .then((res) => setMovies(res.data))
        .catch((err) => console.error("Error fetching movies:", err));
    };
  
    const fetchMoviesEndingWithY = () => {
      axios.get("http://localhost:8080/movies-ending-with-y")
        .then((res) => setMovies(res.data))
        .catch((err) => console.error("Error fetching movies:", err));
    };
  
    const removeBadMovies = () => {
      axios.delete("http://localhost:8080/remove-bad-movies")
        .then(() => fetchMovies())
        .catch((err) => console.error("Error removing movies:", err));
    };
    const searchMovie = () => {
        if (!searchTitle) return;
      
        axios.get(`http://localhost:8080/search-movie?title=${searchTitle}`)
          .then((res) => setMovies(res.data))
          .catch((err) => console.error("Error searching movie:", err));
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-black flex flex-col items-center p-4">
    <h1 className="text-3xl font-bold text-white mb-6 text-center">🎬 Movie Review App</h1>
  
    {/* Form Container */}
    <div className="bg-gray-600 text-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Add a Review</h2>
      <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} 
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="text" placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} 
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="number" placeholder="Rating (1-10)" value={rating} onChange={(e) => setRating(e.target.value)} 
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="text" placeholder="Your Name" value={reviewer} onChange={(e) => setReviewer(e.target.value)} 
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={addReview} 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Submit Review
      </button>
    </div>
  
    {/* Query Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mt-6 w-full max-w-lg">
      <button onClick={fetchMoviesStartingWithA} className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition">Movies Starting with A</button>
      <button onClick={fetchMoviesEndingWithY} className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition">Movies Ending with Y</button>
      <button onClick={removeBadMovies} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">Remove Movies (rating less than 3)</button>
      <button onClick={fetchMovies} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">Reset List</button>
      <button onClick={fetchReviewsByAditya} 
  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition">
  Reviews by Aditya
</button>

    </div>
  
    {/* Movie Counters */}
    <div className="flex justify-center gap-6 text-white text-lg mt-4">
      <p>Total Movies: <span className="font-semibold text-yellow-400">{movieCount}</span></p>
      <p>Highly Rated Movies: <span className="font-semibold text-green-400">{highlyRatedCount}</span></p>
    </div>
  
    {/* Search Bar */}
    <div className="flex items-center bg-gray-700 text-white rounded-lg p-2 mt-4 w-full max-w-md">
      <img src="https://cdn-icons-png.flaticon.com/512/751/751463.png" alt="Search Icon" className="w-6 h-6 mr-2" />
      <input type="text" placeholder="Search movie by title..." value={searchTitle} 
        onChange={(e) => setSearchTitle(e.target.value)} className="w-full bg-transparent focus:outline-none" />
      <button onClick={searchMovie} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Search
      </button>
    </div>
  
    {/* Reviews Section */}
    <h2 className="text-2xl font-semibold text-gray-300 mt-8 mb-4 text-center">Reviews</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
      {movies.length > 0 ? movies.map((movie, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">{movie.title} <span className="text-blue-500">({movie.rating}/10)</span></h3>
          <p className="text-gray-600 mt-2">{movie.review}</p>
          <p className="mt-2 text-sm text-gray-500">- {movie.reviewer}</p>
        </div>
      )) : (
        <p className="text-gray-300 text-center">No reviews yet. Be the first to add one!</p>
      )}
    </div>
  </div>
  
  );
};

export default Frontpage;
