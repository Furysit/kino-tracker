import { useEffect, useState } from 'react'
import './App.css'
import { BsFilm } from "react-icons/bs";
import { ViewToggle } from './Components/ViewToggle';
import { AddMovieDialog } from './Components/AddMovieDialog';
import { MovieList } from './Components/MovieList';
import { Pagination } from './Components/Pagination';
import { fetchMovies, addMovie, deleteMovie, searchMovies } from "./api/MoviesApi";
import { Search } from './Components/Search';

  
  function App({ token, onLogout }) {
    const [viewMode, setViewMode] = useState('grid');
    const [movies, setMovies ] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const loadMovies = async (page, query = "") => {
    try {
      const data = query.trim()
        ? await searchMovies(page, token, query)
        : await fetchMovies(page, token);

      if (data.error === "Unauthorized") {
        onLogout();
        return;
      }

      setMovies(data.movies || []);
      setTotalPages(data.total_pages || 1);
      setTotalMovies(data.total || 0);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  useEffect(() => {
    if (token) loadMovies(currentPage, searchQuery);
  }, [token, currentPage, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
      setMovies(prev => prev.filter((m) => m.id !== id));
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
        <div className="relative flex flex-col z-10 mx-auto px-4 py-8  items-center justify-center">

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
              <Search token={token} currentPage={currentPage} onSearchChange={setSearchQuery}/>
              <AddMovieDialog onAddMovie={handleAddMovie}  />
          </div>
          <div className='h-6 mb-4 text-gray-200 text-shadow-xs text-shadow-black text-[16px] text-left'>
            <p>{totalMovies} {totalMovies == 1 ? 'movie' : 'movies'} watched</p>
          </div>
          {/* Movie list with 2 states of representation */}
          <MovieList movies={movies} viewMode={viewMode} onDelete={handleDeleteMovie} />
        {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
        </div>
        </div>

      
  )}

  export default App
