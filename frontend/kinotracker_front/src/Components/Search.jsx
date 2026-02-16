import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";


export function Search({ onSearchChange }) {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedInput(searchInput), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    onSearchChange(debouncedInput);
  }, [debouncedInput]);

  return (
    <div className="flex w-1/2 h-full items-center">
      <div className="flex w-full">
        <input
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border-amber-400 border-1 rounded-2xl p-2 w-full bg-amber-100"
        />
      </div>
      <div className="flex w-fit p-2 items-center text-2xl text-amber-400">
        <button onClick={() => onSearchChange(searchInput)}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}