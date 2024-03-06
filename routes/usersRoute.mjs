import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../modules/user.mjs";
import UserController from "../controllers/userControl.mjs";
import Auth from "../middleware/auth.mjs";

const USERS = express.Router();

//array where users are stored
const userbase = [];
const userController = new UserController();
const secretKey = 'my-secret-key';

USERS.post('/login', Auth, (req, res, next) => {
  const authUser = req.authUser;

  const token = jwt.sign({ userId: authUser.id , username: authUser.username}, secretKey, { expiresIn: '1h' });
  const userId = parseInt(authUser.id);
  const userName = authUser.username;
  console.log(token);
  console.log(userId);

  res.status(200).json({ message: 'Login successful', token, userId, userName});

});


USERS.post('/', async(req, res, next) => {

    //hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    //posting user info from body
    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;


    //using the user constructor from user.mjs to fill in info
    const user = new User(username, email, password);

    //checking if user already exists
    const userExists = userbase.find(u => u.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
    } else if (username != "" && email != "" && password != "") {
        userbase.push(user)
        
            const created = await userController.createUser(user.username, user.email, user.password);
            res.status(201).json(created).end();
  

    }

})



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