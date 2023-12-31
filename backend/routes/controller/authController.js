const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blacklist = require('../../models/blacklisted');

class authController {
  async register(req, res) {
    const { username, password, email, UserType } = req.body;

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document with the hashed password
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        UserType: UserType,
      });

      // Save the new user to the database
      await newUser.save();

      // Creating an auth session for the user with jwt immediately after registration
      const payload = {
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      };
      const secret = 'secretkey';

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      console.log('Generated token: ', token);

      res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Creating an auth session for the user with jwt
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };
      const secret = 'secretkey';

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      console.log('Generated token: ', token);

      res.status(200).json({ token, userid: user.id, username: user.username });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }




//post new property info
  async post(req, res){
    //Authorization tokens checked in blacklist.
    const token =  req.headers.authorization.replace('Bearer ', '');
   
  const checkToken = await Blacklist.findOne({token});



  if (checkToken){
    return res.json({message: 'Please Login'});
  }
    res.json({ message: 'Authenticated User', user: req.user });

  }

//getting users from db
async getusers(req, res){
  //sender reciever will have to be email addresses
  //console.log('entire req', req)
  const {sender, receiver} = req.body;
//console.log('sender and reciever', sender, reciever)
  try{
let senderid = await User.findOne({ email:sender });
let receiverid = await User.findOne({ email: receiver });

  res.json({senderID : senderid.id, receiverID: receiverid.id});
  console.log(`senderID : ${senderid.id}, receiverID: ${receiverid.id}`)

  }catch(error){
    console.log(error)
  } 



}


//get users object. takes in email returns a users obj
async usersobj(req, res){
const {usersemail} = req.body;
try{
  let userobj = await User.findOne({email: usersemail});

  res.json({userobj});
  console.log('userobj', userobj)

} catch(error){
  res.json({Error : error})
}
}


//takes in users id and returns users object
async usersobjFromId(req, res){
  const {id} = req.body;
  try{
    let userobj = await User.findOne({_id: id});
  
    res.json({userobj});
    console.log('userobj', userobj)
  
  } catch(error){
    res.json({Error : error})
  }
  }



//logout

async logout(req, res){

  const {user} = req.body;

  const authtoken =  req.headers.authorization.replace('Bearer ', '');
   
  const blacklist = new Blacklist({
    user: user,
    token: authtoken,
  }
  )

  await blacklist.save();

  
  res.json({message: 'Logged out:', user: req.user});
}







async postdata (req, res) {
  


// Define a filter to uniquely identify the document you want to update
const filter = { username: 'user6' }; // Replace 'username' and 'user7' with your filter criteria

// Define the data you want to set in the 'listing' field
const { listing, pushpin1} = req.body
const listingData = {
  propertyType: 'Apartment',
  price: 4999,
  description: 'Luxury apartment with stunning city views',
  propertyName: 'Lux Apartmentz',
  location: 'Nakuru, Kenya',
};


const pushpin = {
  location: [-1.3217, 36.6764], // Latitude and longitude
  infoboxOption: {
    title: 'Karen',
    description: 'Karen Ridge',
  },
}
// Use Mongoose's updateOne method to add the 'listing' field to the document

const updateQuery = User.updateOne(filter, { pushpin: pushpin });

// Execute the query using the `exec()` method
updateQuery.exec()
  .then((result) => {
    console.log('Document updated:', result);
    res.json({message: 'updated'})
  })
  .catch((err) => {
    console.error('Update failed:', err);
    res.json({message: err})
  });

//console.log(response)
//res.json({message:response})


}









}
 
module.exports = new authController();
