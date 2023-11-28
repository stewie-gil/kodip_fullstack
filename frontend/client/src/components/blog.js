// Blog.js

import React from 'react';
import './blog.css';

const Blog = () => {
  return (
    <div className='blog'> 
    <h2 className="latest_blog_text">Latest Blogs</h2>
    <div className="blog-container">


    <div className="blog-column">
      <div className="blog-post">
        <img
          src="https://images.unsplash.com/photo-1562664348-1ee6c6c0ce92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHJlbnR8ZW58MHx8MHx8fDA%3D" // Placeholder image
          alt="Blog Post"
          className="blog-image"
        />
        <div className="blog-content">
          <h3>Top 10 Must-Have Features in Your Dream Rental Home</h3>
          <p>
          Discover the essential features that can turn a rental property into your dream home. Whether it's a spacious kitchen, a cozy fireplace, or a stunning view, find out what makes a rental truly exceptional.
          </p>
        </div>
      </div>

      <div className="blog-post">
        <img
          src="https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVudHxlbnwwfHwwfHx8MA%3D%3D" // Placeholder image
          alt="Blog Post"
          className="blog-image"
        />
        <div className="blog-content">
          <h3>Budget-Friendly Rental Hacks That Will Save You Money</h3>
          <p>
          Renting on a budget? Explore creative and effective hacks to make the most of your rental budget without compromising on comfort. From negotiating rent to finding hidden gems, discover how to save big on your next rental.
          </p>
        </div>
      </div>


      <div className="blog-post">
        <img
          src="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvbWV8ZW58MHx8MHx8fDA%3D" // Placeholder image
          alt="Blog Post"
          className="blog-image"
        />
        <div className="blog-content">
          <h3>The Art of Decorating a Rental Without Breaking the Lease</h3>
          <p>
          Unleash your inner decorator! Learn how to personalize your rental space without violating lease agreements. From removable wallpaper to versatile furniture, discover creative ways to make your rental feel like home.
          </p>
        </div>
      </div>

 
      {/* Add more blog posts as needed */}
    </div>

    




    <div className="blog-column2">
      <div className="blog-post2">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D" // Placeholder image
          alt="Blog Post"
          className="blog-image2"
        />
        <div className="blog-content2">
          <h3>The Ultimate Guide to Stress-Free Apartment Hunting</h3>
          <p>
          Explore expert tips and tricks to streamline your apartment search and find the perfect rental for your needs. From budgeting to neighborhood exploration, we've got you covered.
          </p>
        </div>
      </div>  

  
      
      {/* Add more blog posts as needed */}
    </div>
    </div>

    </div>
  );
};

export default Blog;
