import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserController from "../controllers/userControl.mjs";
import Auth from "../middleware/auth.mjs";

const USERS = express.Router();
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

    //checking if user already exists
    const userCheck = await userController.userExists(email);

    if (userCheck) {
      console.log("user already exists")
      return -1
      
  } else if (username !== "" && email !== "" && password !== "") {
      try {
          const created = await userController.createUser(username, email, password);
  
          return res.status(201).json(created).end();
      } catch (error) {
          console.error('Error creating user:', error).end();
      }
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