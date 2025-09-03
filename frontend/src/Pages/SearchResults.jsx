import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import { useParams } from 'react-router-dom';
import { productsAPI } from '../api.js';
import "./Styles/SearchResults.css";
import wrongsearch from "../Assets/images/wrongsearch.jpg";

const SearchResults = ({ onRefocusSearch }) => {
  const { query } = useParams();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await productsAPI.search(query);
        setSearchData(response.products || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchData([]);
      }
    }
    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className='Search'>
      <div>
        <h1 className='Search-heading'>Search Results</h1>
      </div>
      {searchData.length > 0 ? (
        <div className="search-result-container">
          {searchData.map((item) => (
            <div key={item.id} className="search-card-container">
              <Card product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-message">
          <img className="wrong-search" src={wrongsearch} alt="" />
          <p>No results found for "{query}". But Pikachu didn't come up empty… he’s got questions (and a knife).&nbsp;
            <span 
              onClick={onRefocusSearch} 
              style={{ color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Care to try again?
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
