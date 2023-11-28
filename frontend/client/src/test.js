const axios = require('axios');

axios.get('http://localhost:3001/api/properties')
      .then(response => {
        const dbData = response.data;
        console.log(dbData)
     
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });