import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './moviemodel.js'; // Ensure the correct path

dotenv.config();

const mongo_url = process.env.MONGODB;
if (!mongo_url) {
  console.error("MongoDB connection string is missing in .env file.");
  process.exit(1); // Exit if connection string is not found
}

const mov = [
  { "title": "3 Idiots", "review": "A perfect blend of comedy and emotions.", "rating": 10, "reviewer": "Rahul" },
  { "title": "Lagaan", "review": "An epic sports drama with a patriotic touch.", "rating": 9, "reviewer": "Priya" },
  { "title": "Dangal", "review": "Inspiring and powerful!", "rating": 10, "reviewer": "Amit" },
  { "title": "Sholay", "review": "A cult classic with unforgettable characters.", "rating": 9, "reviewer": "Sunita" },
  { "title": "Gully Boy", "review": "Hip-hop revolution in Indian cinema.", "rating": 8, "reviewer": "Rajesh" },
  { "title": "Kabir Singh", "review": "Intense but controversial love story.", "rating": 6, "reviewer": "Neha" },
  { "title": "Chennai Express", "review": "A fun-filled action-comedy.", "rating": 7, "reviewer": "Suresh" },
  { "title": "Baahubali: The Beginning", "review": "Visual grandeur at its best!", "rating": 9, "reviewer": "Kiran" },
  { "title": "Baahubali 2: The Conclusion", "review": "A cinematic spectacle!", "rating": 10, "reviewer": "Pooja" },
  { "title": "Padmaavat", "review": "Stunning visuals and performances.", "rating": 8, "reviewer": "Manoj" },
  { "title": "Ra.One", "review": "Ambitious but flawed.", "rating": 5, "reviewer": "Anjali" },
  { "title": "Housefull 4", "review": "Over-the-top comedy, but entertaining.", "rating": 6, "reviewer": "Vikram" },
  { "title": "Race 3", "review": "A complete disaster!", "rating": 2, "reviewer": "Sneha" },
  { "title": "Radhe", "review": "Disappointing and repetitive.", "rating": 3, "reviewer": "Nitin" },
  { "title": "Brahmastra", "review": "Visually stunning but weak story.", "rating": 6, "reviewer": "Deepak" },
  { "title": "K.G.F: Chapter 1", "review": "Mass entertainer with a gripping story.", "rating": 8, "reviewer": "Arjun" },
  { "title": "K.G.F: Chapter 2", "review": "Action-packed and thrilling!", "rating": 9, "reviewer": "Meera" },
  { "title": "Jawan", "review": "SRK's powerful comeback!", "rating": 9, "reviewer": "Sanjay" },
  { "title": "Pathaan", "review": "High-energy action drama.", "rating": 8, "reviewer": "Komal" },
  { "title": "Adipurush", "review": "Failed to impress with poor VFX.", "rating": 3, "reviewer": "Gautam" }
];

const insertMovies = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected...");

    await Movie.insertMany(mov);
    console.log("Movies added successfully");

    mongoose.connection.close(); // Close connection properly
  } catch (err) {
    console.error("Error:", err);
    mongoose.connection.close();
  }
};

insertMovies();
