import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false); // Cast bilgisi görünürlüğü
  const [showReviews, setShowReviews] = useState(false); // Review bilgisi görünürlüğü


  const apiKey = '658436c24fc26c204199149b9a4a479b'; 

  // Film detaylarını al
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=658436c24fc26c204199149b9a4a479b`
        );
        setMovieDetails(movieResponse.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=658436c24fc26c204199149b9a4a479b`
        );
        setCast(castResponse.data.cast);

        const reviewsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=658436c24fc26c204199149b9a4a479b`
        );
        setReviews(reviewsResponse.data.results);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, apiKey]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error loading movie details: {error}</div>;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : '/path/to/placeholder.jpg'; // Yer tutucu görsel

  const genres = movieDetails.genres.map((genre) => genre.name).join(', ');

  return (
    <div className={styles.MovieDetailsContainer}>
      <div className={styles.movieCardOverview}>
       <img src={posterUrl} alt={movieDetails.title} width={300} />
   
      <div className={styles.movieCardContainer}>
   <h1>{movieDetails.title}</h1>
      
      <p>{movieDetails.overview}</p>
          <p><strong>Genres:</strong> {genres}</p>
          
        </div>
      </div>

      {/* Additional Information başlığı */}
      <h3>Additional Information</h3>
      <nav>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowCast(!showCast);  // Cast bilgilerini aç/kapat
          }}
        >
          Cast
        </a>
        {' | '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowReviews(!showReviews);  // Reviews bilgilerini aç/kapat
          }}
        >
          Reviews
        </a>
      </nav>

      {/* Cast Bölümü - Görünürlük kontrolü */}
      {showCast && (
        <div>
          <h2 className={styles.castTitle}>Cast</h2>
          <ul className={styles.ul}>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <li key={actor.id}>
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      width={100}
                    />
                  ) : (
                    <img
                      src="/path/to/placeholder.jpg"
                      alt={actor.name}
                      width={100}
                    />
                  )}
                  <p>{actor.name} as {actor.character}</p>
                </li>
              ))
            ) : (
              <p>No cast information available</p>
            )}
          </ul>
        </div>
      )}

      {/* Reviews Bölümü - Görünürlük kontrolü */}
      {showReviews && (
        <div>
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this movie.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
