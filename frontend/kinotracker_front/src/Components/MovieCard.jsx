import { MdOutlineStar } from "react-icons/md";
import { X } from "lucide-react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useState } from "react";

export function MovieCard({ movie, viewMode, onDelete }){
    const [showDelete, setShowDelete] = useState(false)
    
    const handleCardClick = () => {
    setShowDelete((prev) => !prev); 
  };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (window.confirm("Точно удалить этот фильм?")) {
            onDelete?.(movie.id);
        }
    };

    const baseClasses =
    "group relative bg-gray-950/40 backdrop-blur-sm border border-slate-600/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-500/70 hover:shadow-slate-500/20 mb-4 cursor-pointer";

  return (
    <div onClick={handleCardClick} className={`${baseClasses} relative overflow-visible`}>
      {/* DELETE BUTTON */}
      <button
        onClick={handleDeleteClick}
        className={`absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 ${
          showDelete
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 -translate-x-2 -translate-y-2 pointer-events-none"
        }`}
      >
        <X size={18} />
      </button>

      {viewMode === "list" ? (
        <div className="flex flex-row p-5 w-full">
          {/* Poster */}
          <div className="relative h-40 w-40 overflow-hidden rounded-lg">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-row justify-between w-full">
            <div className="flex-col text-white">
              <div className="p-2 flex flex-col">
                <h3 className="font-bold">{movie.title}</h3>
                <span className="text-sm">{movie.year}</span>
              </div>
              <div className="flex p-2 gap-2 items-center">
                <span className="border border-orange-200 rounded-xl bg-orange-300/80 backdrop-blur-xl px-2 py-1 text-[#1e293b] text-sm">
                  {movie.genre}
                </span>
                <span>{movie.runtime} min</span>
              </div>
              <div className="p-2 flex flex-row gap-2 items-center text-slate-500">
                <FaRegCalendarCheck />
                <span> Watched on {movie.watchedDate}</span>
              </div>
            </div>

            <div className="flex items-center flex-col">
              <div className="p-2 flex justify-between items-center">
                <MdOutlineStar className="text-yellow-300 size-8" />
                <span className="text-white text-[30px]">
                  {((+movie.furyRating + +movie.evanRating) / 2).toFixed(1)}
                </span>
              </div>
              <div className="p-4 flex justify-between gap-2 items-center">
                <MdOutlineStar className="text-purple-400" />
                <span className="text-white">Fury: {movie.furyRating}/10</span>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <MdOutlineStar className="text-blue-400" />
                <span className="text-white">Evan: {movie.evanRating}/10</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // GRID MODE
        <div className="flex flex-col p-4">
          {/* Poster */}
          <div className="relative h-60 overflow-hidden rounded-lg">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="py-1 flex flex-row justify-between w-full">
            <div className="flex flex-col text-white max-w-70 justify-between">
              <div className="p-2 flex flex-col gap-1 w-full">
                <h3 className="font-bold">{movie.title}</h3>
                <span className="text-sm">{movie.year}</span>
              </div>
              <div className="flex p-2 gap-2 items-center">
                <span className="border border-orange-200 rounded-xl bg-orange-300/80 backdrop-blur-xl px-2 py-1 text-[#1e293b] text-sm">
                  {movie.genre}
                </span>
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex flex-row gap-2 items-center text-slate-500 mt-auto px-2">
                <FaRegCalendarCheck />
                <span> Watched on {movie.watchedDate}</span>
              </div>
            </div>

            <div className="flex items-center flex-col">
              <div className="p-2 flex justify-between items-center">
                <MdOutlineStar className="text-yellow-300 size-8" />
                <span className="text-white text-[30px]">
                  {((+movie.furyRating + +movie.evanRating) / 2).toFixed(1)}
                </span>
              </div>
              <div className="p-4 flex justify-between gap-2 text-sm">
                <MdOutlineStar className="text-purple-400 size-5" />
                <span className="text-white">F: {movie.furyRating}/10</span>
              </div>
              <div className="flex justify-between gap-2 text-sm">
                <MdOutlineStar className="text-blue-400 size-5" />
                <span className="text-white">E: {movie.evanRating}/10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};