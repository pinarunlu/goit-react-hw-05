import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const apiKey = '658436c24fc26c204199149b9a4a479b';

  // Arama için debounce fonksiyonu
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Arama fonksiyonu
  const fetchMovies = async (query) => {
    if (!query) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=658436c24fc26c204199149b9a4a479b&query=${query}&include_adult=false&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError('Could not fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => fetchMovies(query), 500); // 500ms delay

  // Input değiştiğinde debounced fonksiyonu çağır
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
      />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
