// App.js
import React from 'react';
import Home from './components/home';
import Blog from './components/blog';
import Footer from './components/footer';
import Sample from './components/mini_listing';
import SearchResults from './components/SearchResults';
import ChatComponent from './src2/ChatComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppListings from './listings/AppListings';


function App() {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={ <> <Home /> <Sample /> <Blog />  </>  } />

          <Route path="/sample" element={<Sample />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/search-results" element={< ChatComponent/>} />
          <Route path="/AppListings" element={< AppListings/>} />

        </Routes>
        
       
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
