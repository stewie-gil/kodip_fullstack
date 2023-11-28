const axios = require('axios');



// Define the data for the new document
const newDocument = {
  owner: '655ce434470de2da9bd61125',
  propertyType: 'House',
  price: 250000,
  description: 'Beautiful house for sale',
  propertyName: 'Cozy Cottage',
  location: 'Sunnydale',
  amenities: ['Swimming pool', 'Garden'],
  contactInfo: ['John Doe', 'johndoe@example.com'],
  imageUrls: ['image1.jpg', 'image2.jpg'],
  pushpin: {
    location: [-1.286389, 36.817223], // Latitude and longitude
    infoboxOption: {
      title: 'Kiambu Apartments',
      description: 'A beautiful house for sale in Kiambu',
      propertyType: 'House',
    },
  }
};

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1Y2U0MzQ0NzBkZTJkYTliZDYxMTI1IiwiZW1haWwiOiJqb2huX2RvZTEwQGV4YW1wbGUuY29tIn0sImlhdCI6MTcwMDU4NjYxMSwiZXhwIjoxNzAwNTkwMjExfQ._ldIajeKz3wnDx8ZqB12BYQ3vjeWoCRtfgcTQg238yc';


// Define the URL for your API endpoint
const apiUrl = 'http://localhost:3002/api/auth/properties'; // Replace with your actual API endpoint URL

// Make a POST request to create a new document
axios.post(apiUrl, newDocument, {
headers: { 
    'Authorization': `Bearer ${jwtToken}`,
}

})
  .then((response) => {
    console.log('New document created successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error creating the document:', error);
  });



 // Create a POST request with the JWT token
