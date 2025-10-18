  import { useEffect, useState } from 'react'
  import './App.css'
  import { BsFilm } from "react-icons/bs";
  import { ViewToggle } from './Components/ViewToggle';
  import { AddMovieDialog } from './Components/AddMovieDialog';
  import { MovieList } from './Components/MovieList';
  import { fetchMovies, addMovie, deleteMovie } from "./api/MoviesApi";

  
  function App({ token, onLogout }) {
    const [viewMode, setViewMode] = useState('grid');
    const [movies, setMovies ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadMovies = async (page) => {
    try {
      const data = await fetchMovies(page, token);

      if (data.error === "Unauthorized") {
        onLogout();
        return;
      }

      setMovies(data.movies || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

    useEffect(() => {
    if (token) loadMovies(currentPage);
  }, [token, currentPage]);

  const handleAddMovie = async (movieData) => {
    try {
      const savedMovie = await addMovie(movieData, token);

      if (savedMovie.error === "Unauthorized") {
        onLogout();
        return;
      }

      setMovies(prev => [savedMovie, ...prev]);
    } catch (err) {
      console.error("Ошибка при добавлении фильма:", err);
    }
  };
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id, token);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении фильма:", err);
    }
  };


    return (
      <div className="min-h-screen relative bg-slate-900">
        {/* Background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url(https://i.pinimg.com/1200x/eb/1f/bc/eb1fbcb60f42c7a4200d4ad6e35ad812.jpg)" }} 
        />
        {/* Overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-gray-500/60 to-slate-900/80" />
        {/* Content */}
        <div className="relative flex flex-col z-10 mx-auto px-4 py-8  items-center justify-center ">

          <div className='flex items-center gap-6 mb-9'>
            <BsFilm className=' block w-24 h-24 mr-6' style={{ color: "#e4b86c"}}/>
            <div className='flex flex-col space-y-3'>
              <h1 className="text-white text-3xl font-bold ">Movie Tracker</h1>
              <p className="text-gray-300">Keep track of all the movies you've watched</p>
            </div>
          </div>

          {/* Controls */}
          <div className='flex justify-between items-center w-full max-w-4xl mb-8'>
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode}/>
              <AddMovieDialog onAddMovie={handleAddMovie}  />
          </div>
          <div className='h-6 mb-4 text-gray-200 text-shadow-xs text-shadow-black text-[16px] text-left'>
            <p>{movies.length} {movies.length == 1 ? 'movie' : 'movies'} watched</p>
          </div>
          {/* Movie list with 2 states of representation */}
          <MovieList movies={movies} viewMode={viewMode} onDelete={handleDeleteMovie} />
        </div>
        {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-3 py-1 rounded bg-slate-700 text-white disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-1 rounded bg-slate-700 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
      </div>

      
  )}

  export default App
