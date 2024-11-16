import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MovieSearchApp.css'

const MovieSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch popular movies by default
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=4eced327');
      setMovies(response.data.Search || []); 
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      setMovies([]); 
    }
  };

  const fetchMoviesByTitle = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=4eced327`);
      setMovies(response.data.Search || []); 
    } catch (error) {
      console.error('Error fetching movies by title:', error);
      setMovies([]); 
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=4eced327`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetchMoviesByTitle();
    } else {
      fetchPopularMovies();
    }
  };

  const handleMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Movie Search App</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="movie-list-container">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/placeholder.jpg'}
                alt={selectedMovie.Title}
                className="modal-poster"
              />
              <div className="modal-info">
                <h2 className="modal-title">{selectedMovie.Title}</h2>
                <p className="modal-year">({selectedMovie.Year})</p>
                <p className="modal-plot">{selectedMovie.Plot}</p>
                <p className="modal-genre">
                  <strong>Genre:</strong> {selectedMovie.Genre}
                </p>
                <p className="modal-rating">
                  <strong>Rating:</strong> {selectedMovie.imdbRating}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchApp;