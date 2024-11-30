import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=658436c24fc26c204199149b9a4a479b', 
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('Could not fetch trending movies');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Trending Today</h1> {/* Başlık buraya eklendi */}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

