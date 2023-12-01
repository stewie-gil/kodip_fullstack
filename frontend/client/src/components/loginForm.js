import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

//import styles from './loginform.module.css';
import axios from 'axios';
//import "../chatapp.css";


const firebaseConfig = {
  apiKey: "AIzaSyD-KPygBA0nfwNoR7af9D1mRzuz0Ud2KYA",
  authDomain: 'localhost',
  projectId: 'kodiplus-1b34f'
};

const app = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();




function LoginForm(prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username1, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

 console.log('what we got in storage', localStorage)



  

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    if (localStorage.getItem('authToken') !== null) {
      setLoggedIn(true);
      setUserName(true);
     
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render
  




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged In');
      setLoggedIn(true);
      setName(name);
      setModalOpen(false); // Close the modal after successful login

      
      

    // send request to API to create a users jwt token 
    const loginData ={
      email: email,
      password: password,
      
      };
    
      axios.post('http://localhost:3002/api/auth/login', loginData)
      .then((response) =>{
      console.log('Login in api was successful')
      console.log(response.data)
      const {username, token, userid} = response.data;
     
      // Storing the token in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userid', userid);
      localStorage.setItem('username', username);

      setUserName(username)
      // will check if token is invalid later etc...
      console.log('username after axios post:', username);
      prop.getUser(email, password, username);
      })
      .catch((error)=>{

          console.error('login fail:', error, loginData)
      })
      
    } catch (error) {
      console.log(error);
      setloginerror(error.message);
    }

    
  };


  




  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      console.log('Signed Up', name);
      setLoggedIn(true);
      setUserName(name);
      setModalOpen(false); // Close the modal after successful sign up

      //sending details back to app.js
      //prop.getUser(email, password, name);

      
      //send details to authController in the backend via a post to API.
      const reigsterdata = {
        username: name,
        email: email,
    password: password,
    UserType: 'not set',
    }
    console.log("registering", reigsterdata)
    
    axios.post('http://localhost:3002/api/auth/register', reigsterdata)
    .then((response) =>{
    console.log('register successful')
    console.log(response.data)
    
    }).catch((error)=>{
      console.error('faild to send to backend. Error:', error)
  })

         


    } catch (error) {
      console.log(error);

      setloginerror(error.message);


    }
  };

  const handleLogout = async () => {
    try {

      await auth.signOut();
      setLoggedIn(false);
      console.log('Logged Out');
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
  };


  const toggleDropdownTrue = () => {
    setShowDropdown(true);
  };

const toggleDropdownFalse = () =>
{
  setShowDropdown(false);
}

  return (
    <div >
      {!isLoggedIn && (
        <button onClick={handleClick} className="button1">Login</button>
      )}
      {
        isLoggedIn && (

                <div>
          {/* Dropdown Menu */}
          <div className="dropdownContainer">
            {!showDropdown && <button onClick={toggleDropdownTrue} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && <button onClick={toggleDropdownFalse} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && (
              <div className="dropdownMenu">
                <button onClick={handleLogout} className="text" style={{fontSize: '12px'}}>
                  Logout?
                </button>
              </div>
            )}
          </div>
        </div>



        )
      }
    
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        className="modal"
       
      >
        {!displayName && (
          <form onSubmit={handleLogin} className="form">
          <p style = {{fontWeight: 'bold'}}> Welcome back! Login with your details below 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button type="submit" className="button" onClick = {toggleDropdownFalse}>Log in</button>
            <button onClick={() => setDisplayName(true)} className="button">Sign Up</button>
          {loginerror && (
          <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '50px 0' }}>{loginerror}</p>
          )}

          </form>
        )}
        {displayName && (
          <form onSubmit={handleSignUp} className="form">
          <p style = {{fontWeight : 'bold'}}> New to Kodip? Sign up today 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="How should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />


            <button type="submit" className="button" style = {{padding : '0 px', margin : '4px 0'}}>Sign up</button>

            <p style = {{padding : '0 px', margin: '4px 0'}}> Or </p>

            <button onClick={() => setDisplayName(false)} className="button" style = {{padding : '0 px', margin : '0 px'}}>Login</button>
            {loginerror && (
            <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>
              )}



          </form>
        )}
            </Modal>
      
    </div>
  );
}

export default LoginForm;

