// Home.js
import React from 'react';
import './homecss.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="fold">
      <div className="foldtext">
        <h2 className='foldtext2'>  </h2>

        <h1 className='foldtexth1'>
          House hunting can be hard <br />
          We are here to make it <br />{' '}
          <span style={{ color: 'black', fontSize: '7vh', fontWeight: 'bold' }}>
            easy!
          </span>
        </h1>

        <div>
          <p style={{ fontSize: '19px', fontFamily: 'cursive', marginTop: '12vh', marginLeft: '47px' }}>
            Search through our interactive map and <br />
            find a place you can call home 🙂 

            <div >
              <input
                type="text"
                placeholder=" 🔍 Search for the location you want to live in ..."
                className="search-input"
                style={{margin:'2px'}}
              />
              
              <Link to="/search-results" className="search-link">
              <button className="search-button">Search</button>
            </Link>
            </div>

         
            
          </p>


          <p style={{ fontSize: '19px', fontFamily: 'cursive', marginTop: '1vh', marginLeft: '47px' }}>
            Or ...  <br/>
            Browse through our latest listings 🤗            
            <Link to="/AppListings" className="search-link" style = {{margin:'40px'}}>
              <button className="search-button">View Listings</button>
            </Link>
            
          </p>



        </div>
      </div>

      <div className='half-right'>
        <div className="imagediv">
          <div className='img-overlay'>
            <div className='cards'></div>
          </div>
          <img src="nairobi.png" className="img" />
        </div>
      </div>
    </div>
  );
}

export default Home;
