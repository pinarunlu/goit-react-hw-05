
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=658436c24fc26c204199149b9a4a479b`,
         
        );
        setCast(response.data.cast);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (error) return <div>Error loading cast: {error.message}</div>;

  return (
    <div className={styles.castContainer}>
      <h2 className={styles.castTitle}>Cast</h2>
      <ul className={styles.castCard}>
        {cast.map((actor) => (
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
        ))}
      </ul>
    </div>
  );
};
