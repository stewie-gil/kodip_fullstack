import React, { useEffect, useState } from 'react';
import './listing.css';
import { Link } from 'react-router-dom';

function Sample(){
  const [listings, setListings] = useState([]);

  const properties = [
    {
      propertyType: 'House',
      price: 250000,
      description: 'Spacious family home with a beautiful garden.',
      propertyName: 'Sunset Villa',
      location: 'City A',
      amenities: ['Swimming pool', 'Garden', 'Garage'],
      contactInfo: ['John Doe', '123-456-7890'],
      imageUrls: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Apartment',
      price: 150000,
      description: 'Modern apartment in a prime location.',
      propertyName: 'City View Apartments',
      location: 'City B',
      amenities: ['Gym', 'Security', 'Parking'],
      contactInfo: ['Jane Smith', '987-654-3210'],
      imageUrls: [
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Villa',
      price: 500000,
      description: 'Luxurious villa with stunning views.',
      propertyName: 'Mountain Oasis',
      location: 'City C',
      amenities: ['Jacuzzi', 'Terrace', 'Private garden'],
      contactInfo: ['Alice Johnson', '555-123-4567'],
      imageUrls: [
        'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    },
    {
      propertyType: 'Condo',
      price: 300000,
      description: 'Elegant condo with panoramic city views.',
      propertyName: 'Skyline Heights',
      location: 'City D',
      amenities: ['Concierge', 'Roof deck', 'Fitness center'],
      contactInfo: ['Bob Williams', '111-222-3333'],
      imageUrls: [
        'https://images.pexels.com/photos/2816284/pexels-photo-2816284.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ]
    } ,
    {
      propertyType: 'Condo',
      price: 300000,
      description: 'Elegant condo with panoramic city views.',
      propertyName: 'Skyline Heights',
      location: 'City D',
      amenities: ['Concierge', 'Roof deck', 'Fitness center'],
      contactInfo: ['Bob Williams', '111-222-3333'],
      imageUrls: [
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhvbWV8ZW58MHx8MHx8fDA%3D'
      ]
    }
  ];


  return (
    <div className="featured-rentals-container">
      <h4>--- Featured listings</h4>
      
      <h2>
         
        <Link to="/AppListings" className="search-link">
              <button className="listingsPage">View Listings</button>
            </Link>
       
      </h2>
      
      <div className="property-list">
        
        {properties.map((property, index) => (
          <div key={index} className="property-item">
            <img
              src={property.imageUrls[0]}
              alt={`Property Image`}
              className="property-image"
            />
          </div>
        ))}
      </div>

      <div className="property-list">
        
        
        <div className="featured-property">
          <div className="featured-property-info">
              <h2>
                Let’s tour and see!
              </h2>

              <h3>
              
              Houses recommended by our partners that have been curated to become the home of your dreams!

              </h3>

              <h3 style={{margin:'100px;'}}> House Detail </h3>
              <div> 
              - 4 Bedrooms 
              - 2 Bathrooms
              - 1 Carpark
              - 1 floor

              </div>

              <div className="featured-property-contact">
               <img
              src={'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG90cmFpdCUyMHdvbWFufGVufDB8fDB8fHww'}
              alt={`owner`}
              style={{borderRadius:'100%', height:'100px', width:'100px'}}
               />
              Diana Owino
              House Owner

              </div>
          </div>

         

            
          <div>
            <img
              src={properties[2].imageUrls[0]}
              alt={`Property Image`}
              className="property-image-featured"
            />
          </div>
        </div>  
      </div>
    </div>
  );
  
  
}

export default Sample;