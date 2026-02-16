
export function Pagination({ totalPages, currentPage, setCurrentPage }){

    return(
        <div>
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
                  className={`px-3 py-1 rounded  ${
                    currentPage === i + 1
                        ? 'bg-amber-400 text-white transition-colors duration-500 ease-in-out'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600 transition-colors duration-500 ease-in-out'
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
        
    )
}