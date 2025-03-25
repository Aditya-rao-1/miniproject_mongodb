# Movie Review App 🎬🍿🌟

This is a full-stack web application built with React and Node.js (Express) that allows users to add, view, and manage movie reviews.

## Features ✨

-   **Add Reviews 📝**: Users can add movie reviews with titles, reviews, ratings, and their names.
-   **View Reviews 🎥**: Browse all movie reviews.
-   **Filter Movies 🔍**:
    -   Movies starting with "A" 🅰️
    -   Movies ending with "Y" 🔚
    -   Search movies by title 🔎
-   **Manage Reviews 🗑️**: Remove movies with ratings less than 3.
-   **Reviewer Specific Reviews 🧑**: View reviews by specific reviewers (Aditya).
-   **Statistics 📊**:
    -   Total number of movies reviewed 🔢
    -   Count of highly rated movies (rating >= 8) ⭐

## Technologies Used 🛠️

-   **Frontend**: React.js ⚛️
-   **Backend**: Node.js, Express.js 🚀
-   **Database**: MongoDB 🍃
-   **Styling**: Tailwind CSS 🎨
-   **HTTP Client**: Axios 🌐

## Setup ⚙️

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies (frontend):**

    ```bash
    cd <frontend_directory> # if you have separate frontend and backend directories
    npm install
    ```

3.  **Install dependencies (backend):**

    ```bash
    cd <backend_directory> # if you have separate frontend and backend directories
    npm install
    ```

4.  **Set up MongoDB:**

    -   Ensure MongoDB is installed and running.
    -   Create a `.env` file in your backend directory with the following content:

        ```dotenv
        PORT=8080
        MONGODB=<your_mongodb_connection_string>
        ```

5.  **Run the backend server:**

    ```bash
    cd <backend_directory>
    npm start
    ```

6.  **Run the frontend application:**

    ```bash
    cd <frontend_directory>
    npm start
    ```

7.  **Open your browser and navigate to `http://localhost:3000` 🌐.**

## API Endpoints 🔗

-   `POST /add-review`: Add a new movie review.
-   `GET /get-reviews`: Get all movie reviews.
-   `GET /movies-starting-with-a`: Get movies starting with "A".
-   `GET /movies-ending-with-y`: Get movies ending with "Y".
-   `GET /movie-count`: Get the total number of movies.
-   `GET /highly-rated-movies`: Get the count of highly rated movies.
-   `DELETE /remove-bad-movies`: Remove movies with ratings less than 3.
-   `GET /search-movie?title={title}`: Search movies by title.
-   `GET /reviews-by-aditya`: Get reviews by Aditya.

## Screenshots 🖼️

*(Add screenshots of your application here)*

## Contributing 🤝

Feel free to contribute by submitting pull requests, reporting issues, or suggesting new features.

## Author 🧑‍💻

[Adithya/GitHub Profile](<https://github.com/Aditya-rao-1>)

Enjoy reviewing movies! 🍿🎉
