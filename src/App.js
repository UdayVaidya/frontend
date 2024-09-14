import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('/countries.json') // Note: the path should start with '/'
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching data:', error)); // Handle errors
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter suggestions based on input
    const filteredCountries = countries.filter(country => {
      return (
        country.country.toLowerCase().includes(query.toLowerCase()) ||
        country.capital.toLowerCase().includes(query.toLowerCase())
      );
    });
    setSuggestions(filteredCountries);
  };

  // Function to handle suggestion clicks
  const handleSuggestionClick = (country) => {
    setSearchQuery(country.country); // Set the search query to the selected country
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="App">
      <h1>Country Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by country or capital..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(country => (
              <li key={country.country} onClick={() => handleSuggestionClick(country)}>
                {country.country} ({country.capital})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
