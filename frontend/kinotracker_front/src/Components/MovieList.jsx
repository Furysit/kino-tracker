import { MovieCard } from "./MovieCard";

export function MovieList({movies, viewMode, onDelete}){
    if (movies.length === 0){
        return(
            <div className="text-center py-12">
                <div className="text-gray-300 mb-4">
                    <p>No movies in your wathclist yet.</p>
                    <p>Start by adding your first movie.</p>
                </div>
            </div>
        );
    }

    if (viewMode == 'grid'){
        return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} viewMode={viewMode} onDelete={onDelete} />
            ))}
      </div>
        )
    }
    if (viewMode == 'list'){
        return (
        <div className="space-y-0">
            {movies.map((movie)=> (
                <MovieCard key={movie.id} movie={movie} viewMode={viewMode} onDelete={onDelete} />
            ))}
        </div>
        );
    }
    
}