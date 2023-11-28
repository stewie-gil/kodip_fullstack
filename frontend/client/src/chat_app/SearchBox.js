import React, { useState } from 'react';
import './SearchBox.css';
import axios from 'axios';

function SearchBox() {
const [searchQuery, setSearchQuery] =useState('')



  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };




 function handleSearch(input){




  //first lets query the db getting all users. 
  const response = axios.post('http://localhost:3002/api/auth/getusers')

  //then we filter the users we want 




  //then lets  filter only coordinates tha fit the search query


    console.log('handle search was called with ', input);
// the idea is to filer the db based on keywords like 1 bedroom, mombasa etc and get some coordinates 
//then use those coordinates to show only those pins that fit that. eg the pins that only fit 1 bedroom
// the pins that only fit 2 bedroom or pins that fit mombasa.

setSearchQuery('');

  }

  return (
    <div className="search-container"  >

      <div className='search'>
      <form onSubmit={handleSubmit}>
      
        <div className="search-buttons">
          <input
          type="text"
          placeholder="  🔍   Search... "
          className="inputfield"
          value={searchQuery}
          onChange={handleInputChange}
          

        /> 
        
        
        <button onClick={() => handleSearch('Studio Apartments')}>Studio Apartments</button>
         
          <button onClick={() => handleSearch('1 Bedroom')}>1 Bedroom</button>
          <button onClick={() => handleSearch('2 Bedroom')}>2 Bedroom</button>
          <button onClick={() => handleSearch('3 Bedroom')}>3 Bedroom</button>
          <button onClick={() => handleSearch('Airbnbs')}>Airbnbs</button>
        </div>
      </form>
      </div>


    </div>
  );
}

export default SearchBox;
