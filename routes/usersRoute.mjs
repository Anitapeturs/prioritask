import express from "express";
import User from "../modules/user.mjs";
import UserController from "../controllers/userControl.mjs";
import crypto from "crypto"
import jwt from "jsonwebtoken"


const USERS = express.Router();

//array where users are stored
const userbase = [];
const secretKey = 'my-secret-key';
const userController = new UserController();


USERS.post('/', async(req, res, next) => {

    //hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    //posting user info from body
    const id = crypto.randomBytes(16).toString("hex");
    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;


    //using the user constructor from user.mjs to fill in info
    const user = new User(id, username, email, password)

    //checking if user already exists
    const userExists = userbase.find(u => u.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
    } else if (username != "" && email != "" && password != "") {
        userbase.push(user)
        
            const created = await userController.createUser(user.id, user.username, user.email, user.password);
            res.status(201).json(created).end();
         // Sending newUser information into the createUser function inside userController(userControl.mjs)
  

    }

})

USERS.post('/login', async (req, res, next) => {

    const pass = req.body.password;
    const usrName = req.body.username;

    //hashing password
    var hashed = crypto.createHash('sha256').update(pass).digest('hex');

    

  // Check if the user exists and credentials are valid
  const user = userbase.find(u => u.username === usrName && u.password === hashed);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token and send it as the response
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});



//get user by id
USERS.get('/:id', async(req, res, next) => {
    // Send a request to the usercontroller to get user
    
    const userId = req.params.id;
    console.log(userId)
    
    const getUser = await userController.oneUser(userId);
    res.status(200).json(getUser);
  });

//updating users with put
USERS.put('/:id', async(req, res, next) => {

    const username = req.body.username;
    const id  = req.params.id;
  
    // Running the updateUser function from userController(userControl.mjs)
    const updatedUser = await userController.updateUser(username, id);
    console.log("the user was updated", updatedUser)
    res.status(200).json(updatedUser);


    })


//delete user by id
USERS.delete('/:id', async(req, res, next) => {

    const  id  = req.params.id;
  
  // Send a request to the usercontroller to delete user
  const userDeleted = await userController.deleteUser(id);

  res.status(200).json(userDeleted);
  // return tasks;
})

export default USERS;