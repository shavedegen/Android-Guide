import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-container glass animate-fade-in-up delay-100">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder="Ask a question (e.g., 'How to turn on flashlight')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
