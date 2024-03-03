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
USERS.get('/:id', (req, res, next) => {

    const userId = parseInt(req.params.id);

    //finding user in the userbase
    const userById = userbase.filter(function (user) {
        return parseInt(user.id) === parseInt(userId);

    });

    //return the user by id
    res.status(200).json({
        userById
    });
})


//updating users with put
USERS.put('/:id', (req, res, next) => {


    for (var i = 0; i < userbase.length; i++) {

        const userId = parseInt(req.params.id)

        if (parseInt(userbase[i].id) === userId) {
            userbase[i].username = req.body.username;
            userbase[i].email = req.body.email;
            break
        }
        
    }


    res.status(200).json({
        message: 'handling PUT requests to /user', userbase
    })
})

//delete user by id
USERS.delete('/:id', (req, res, next) => {

    //finding the user by id to delete
    const indexToRemove = userbase.findIndex((usr) => parseInt(usr.id) === parseInt(req.params.id));
    userbase.splice(indexToRemove, 1);
    console.log(userbase);

    res.status(200).json({
        message: 'user deleted'
    })
})

export default USERS;