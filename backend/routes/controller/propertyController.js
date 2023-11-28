const  basemodel = require('../../models/basemodel');

class propertyController{
    async post(req, res){

        
const { owner, propertyType, price, description, propertyName, location, amenities, contactInfo, imageUrls, pushpin } = req.body;

const newProperty = new basemodel(
    {
        owner,
        propertyType,
        price,
        amenities,
        contactInfo,
        imageUrls,
        description,
        propertyName,
        location,
        pushpin
    }
)
console.log(newProperty);

await newProperty.save();
res.json({message: 'saved Property:', newProperty})
    }


    async get(req, res){

        const property = await basemodel.find();
        res.json({message: 'items', property});

    }


    
//get all properties with pin from db
async userswithpin(req, res){
    //console.log('triggererd');
    //sender reciever will have to be email addresses
    //console.log('entire req', req)
    //const {sender, receiver} = req.body;
  //console.log('sender and reciever', sender, reciever)
    try{
    const users = await basemodel.find({ pushpin: { $exists: true }});

    console.log('users with pin', users)
  
    res.json({users: users});
    //console.log('users', users)
  
    }catch(error){
      //console.log('users', users)
      //console.log(error)
    } 
  
  
  
  }
  
}

module.exports = new propertyController();