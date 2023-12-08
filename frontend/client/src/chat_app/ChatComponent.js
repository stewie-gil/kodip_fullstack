import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
//import './cssfile.css';
import Header from './components/header';
//import user from '../../../models/userModel';
import LoginForm from './components/loginForm';
import MapComponent from './components/mapfile';

import axios from 'axios';
import SearchBox from './SearchBox';
import './chatapp.css';
import Sidebar from './components/sidebar';
//import './components/Sidebar.css';
//import './components/loginmodal.css'

const serverURL = 'http://localhost:3002';

const socket = io(serverURL);

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [userfrompin ,SetUserFromPin] = useState([])
  


 


  const openMessageModal = () => {
    if (isMessageModalOpen){
      setMessageModalOpen(false);
    } else{
      setMessageModalOpen(true);
    }
    
  };





  useEffect(() => {
    // Handle connecting to the server and receiving online users
    //connect event is automatically emited by the client when it connects to a server.
    socket.on('connect', () => {
      console.log('Socket.io connection established');
    });

    // recieve a list of online online  users
    socket.on('online users', (users) => {
      console.log("online users received", users);
      setOnlineUsers(users);
    });
  }, []);



  // Handle receiving private messages from the server
 
  useEffect(() => {
    socket.on('A private message', ({ from, message, email}) => {
      const newReceivedMessage = {
        from,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
     
      //console.log('message counter', messageCounter);
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      console.log('message received', message);
    });
  }, []);


  useEffect(() => {
    socket.on('An private message', ({ from, message }) => {
      const newReceivedMessage = {
        from,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
     
      //console.log('message counter', messageCounter);
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      console.log('message received', message);
    });
  }, []);

  
  const sendMessage = () => {
   
//first have a selected user
    if (selectedUser) {
      socket.emit('private message', {
        to: selectedUser,
        message: newMessage,
        from: userName,
        email: email,

      });
     
      setSentMessage(newMessage);
      setNewMessage('');
    }
 //look for the selected user in mongodb users database by querying the api.
const sender = email;
const receiver = selectedUser.useremail || selectedUser.email;
const reqdata = {
  sender,
  receiver,
}
console.log('req', reqdata);

async function mes(){
try {
const response = await axios.post('http://localhost:3002/api/auth/getusers', reqdata)

const {senderID, receiverID} = response.data;
console.log("senders id and receirs id", response.data)

const messdata = {
  senderid: senderID,
  receiverid: receiverID,
  message: newMessage,
  }
console.log('messdata bf .then', messdata)
//match with their id and then create your axios post
return messdata;
//now we will have the senders id and the receiversid . we now create a post to the messagecontroller asking it to save the message obj to database

}catch(error){
  console.log('send message error', error);
}

  }

  mes(reqdata)
  .then((messdata)=> {
    console.log('what we are sending', messdata)
      const messresponse = axios.post('http://localhost:3002/api/auth/sendmessage', messdata)
      console.log('send message response', messresponse)

  })
  .catch((error) => {
    console.log('messdata error', error)
  })


  
 };


//handling when a user clicks
  function selectingUser (user, email) {
    setChatHistory('');
    SetUserFromPin(user.data.userobj);
    
    console.log("selecting user how many times called? ", user.data.userobj);
  }


//takes in a bool : true or false for opening or closing message modal and a pins email
const messmodalfunction = async (bool, pinId) =>{
  console.log('messdmodal function email and bool', pinId, bool);
  if (pinId) {
  const user = await axios.post('http://localhost:3002/api/auth/usersobjfromid', {id: pinId})
  
  console.log('what is pin userobj', user, bool);
  setMessageModalOpen(bool)
  const emaill = user.email
  
  


  setSelectedUser(user.data.userobj)
 
//we need to use the usersemail to identify the user object and call the onclick function while passing it
//so that we simulate when a user selects a particular user

//
selectingUser(user, email);
console.log('how many time is messmodalfunction getting called/running', user.data.userobj, email);

}
}




//send the users details to server so it is included as part of the online users only when the localStorage.userid changes
useEffect(()=>{
  if(localStorage.authToken){
    console.log('doing a get', localStorage.userid)

  axios.post('http://localhost:3002/api/auth/usersobjfromid', {id: localStorage.userid})
  .then(user =>{


setEmail(user.data.userobj.email);
setPassword('not set');
setUserName(user.data.userobj.username)

const userobj = user.data.userobj


setUsers([...users, userobj]);
    socket.emit('user login', userobj);
    

  })
  .catch(error=>{
    
    console.log(error)}
  
  )
  }

}, [localStorage.userid]);
  


  





//expected  res.json({senderID : senderid._id, receiverID: receiverid._id});
//getchathistory takes in a senders email and a recievers email and returns the chat history of the two
async function getchathistory(email, emailselect) {
  try {
    const emaildata = {
      sender: email,
      receiver: emailselect,
    };
    console.log('what we are sending to getusers', emaildata);

    const response = await axios.post('http://localhost:3002/api/auth/getusers', emaildata);
    const { senderID, receiverID } = response.data;
    console.log("senders id and receivers id", response.data);

    const messdata = {
      senderid: senderID,
      receiverid: receiverID,
      message: newMessage,
    };
    console.log('messdata before .then', messdata);

    const resp = await axios.post('http://localhost:3002/api/auth/chathistory', response.data);
    console.log("chathistory success:", resp.data.messages);

    // Handle the received data and set the state here
    let messagesArray = resp.data.messages;
    let hist = [];

    for (let i = 0; i < messagesArray.length; i++) {
      hist.push(messagesArray[i].content);
    }

    console.log(hist);
    setChatHistory(hist);
  } catch (error) {
    console.error('Error in getchathistory:', error);
  }


}







useEffect(() => {
  // This effect will run whenever selectedUser changes
  if (selectedUser) {
    console.log('who have we selected', selectedUser.email);
    //getchat history requires two emails, sender and reciever to load chat history
    getchathistory(localStorage.email, selectedUser.email);
  }
}, [selectedUser, email]);





return (
  <div className="Entirepage">


    <div className="sidebar">   
   
    

    <div> 
      <button className="message-button" onClick={openMessageModal} style={{backgroundColor: '#a3d7f5', color: 'black' }}>
        Messages
      </button>
    
      {isMessageModalOpen && (
        <>
         

          <div className="message-app">
            
            
            
            <div className="contacts">
              <div>
                
                <h3 
                style={{  
                backgroundColor: 'rgba(163, 215, 245, 0.292)', padding:'10px',
                width:'100%'
                }}>
                  
                  Contacts</h3>
                <ul id="contact-list">
                
                
                  {onlineUsers.map((user) => (
                                      
                    <li key={user.email}>

                      <h4
                        onClick={() => {
                          setSelectedUser(user);
                          
                          //getchat history requires two emails, sender and reciever to load chat history
                         
                        }}
                        className={selectedUser.userusername === '' ? 'active-contact' : ''}
                      >
                  
                        { console.log("userfrom pin", user)}

                        {user.username   }
                        
                      </h4>
                      <h4 onClick={() => {
                        
                          setSelectedUser(userfrompin);
                                                    
                        }}
                        className={selectedUser.userusername === '' ? 'active-contact' : ''}
                        
                        >
                          {userfrompin.username}</h4>
                    </li>
                  ))}


                </ul>
              </div>
            </div>



            <div className="chat-container">
              <div className="chat-messages">
                {selectedUser.userusername || selectedUser.username  ? (
                  <h3 style={{  
                    backgroundColor: 'rgb(232 239 243 / 67%)', padding:'10px',
                    width:'80%'
                    }}
                  
                  
                  >Sending a message to {selectedUser.userusername || selectedUser.username ||'None'}</h3>
                ) : null}

                <div class='chatdiv' style={{paddingLeft:'20px', overflow:'auto'}}>
                  {chatHistory.length > 0 && (
                    <div >
                      {(() => {
                        const chatElements = [];

                        for (let i = 0; i < chatHistory.length; i++) {
                          chatElements.push(<p className='chat-text' key={i}>{chatHistory[i]}</p>);
                        }
                        return chatElements;
                      })()}
                    </div>
                  )}
                </div>

                {messages.map((message, index) => (
                  <div key={index} className="message">
                    <p>
                      <strong>{message.from || 'You'}: </strong>
                      {message.message}
                    </p>
                  </div>
                ))}
              </div>
              <div >
                <input
                className="chat-input"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
              </div>
            </div>




          </div>

        </>
      )}



    </div>
    </div>

    <div className="Map">
      <MapComponent setmessagemodal={messmodalfunction} />

    
    </div>

    <div className="search-bar" >
      <SearchBox />

      
    
    </div>


    
  </div>
);





}

export default ChatComponent;
