const axios = require('axios');

//register
/*
const reigsterdata = {
    username: 'some_user',
    email: 'user20@gmail.com',
password: 'anewpassword',
UserType: 'landlord',
}

axios.post('http://localhost:3002/api/auth/register', reigsterdata)
.then((response) =>{
console.log('register successful')
console.log(response.data)

})
.catch((error)=>{
    console.error('register fail:', error)
})
const messdata = {sender: '6536cc58d0f01b6d8c424ad6', receiver: '6536cc58d0f01b6d8c424ad6'}

/*
//login

const reigsterdata = {
  email: 'user19@gmail.com',
  password: 'anewpassword',
}

  axios.post('http://localhost:3002/api/auth/login', reigsterdata)
  .then((response) =>{
  console.log('Login successful')
  console.log(response.data)
  
  })
  .catch((error)=>{
      console.error('login fail:', error)
  })

/*
  // logout
  const apiUrl = 'http://localhost:3002/api/auth/logout'; 
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2NjE0NzlmZTM0NmJiMmM2ZDc0NzIxIiwiZW1haWwiOiJqb2huX2RvZTEzQGV4YW1wbGUuY29tIn0sImlhdCI6MTcwMTE4OTA2MSwiZXhwIjoxNzAxMTkyNjYxfQ.ReBzOYlCPV3lGWY1BEJDPXHBozW4dpzK8ACsdIBJU0s'


const credentials = {
  user :'65661479fe346bb2c6d74721'
}


axios
  .post(apiUrl, {credentials}, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  })
  .then((response) => {
    console.log('Success logged out');
  })
  .catch((error) => {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  });

/*



/*
//try posting when your session is expired or dont have a valid jwtToken

const apiUrl = 'http://localhost:3002/api/auth/post'; 
const jwtToken = 'invalidtoken'

// 
axios
  .post(apiUrl, {}, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  })
  .then((response) => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

/*

const apiUrl = 'http://localhost:3002/api/auth/postdata'; // Replace with your actual URL


// 
axios
  .post(apiUrl, {})
  .then((response) => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  */






/*




  const apiUrl = 'http://localhost:3002/api/auth/userswithpin'; // Replace with your actual URL

  const allpins =[]
  // 
  axios
    .post(apiUrl, {})
    .then((response) => {
      
  
      const extractedData = response.data.users.map((item) => {
        const { location, infoboxOption } = item.pushpin;
        
        const pushpin2 =   
        {
          "location":location, 
          "addHandler":"mouseover",
          "infoboxAddHandler": {"type" : "click" }, //on click the pushpin, infobox shown
          "infoboxOption": { 
            title: infoboxOption.title, 
            description: 'Click here to message owners',
            
          },
          "pushPinOption":{ color: 'brown', description: 'PushPin' },
        }
      
      allpins.push(pushpin2)
      
        
      });
      
  
    })
    

    function waitBeforeExecute(delayInMilliseconds, callback) {
      setTimeout(callback, delayInMilliseconds);
    }

    waitBeforeExecute(5000, () => {
      console.log(allpins);
    });

    
   
    axios.get('http://localhost:3002/api/auth/properties')
      .then(response => {
        const dbData = response.data;
        console.log(dbData.property)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });*/
      
      
      axios.post('http://localhost:3002/api/auth/usersobjfromid',{id: '655ce434470de2da9bd61125'})
      .then(response=>{
        console.log(response.data)
      })
      