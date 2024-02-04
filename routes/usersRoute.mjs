import express from "express";
import User from "../modules/user.mjs";
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import { brotliCompress } from "zlib";
const USERS = express.Router();

//array where users are stored
const userbase = [];
const secretKey = 'my-secret-key';


USERS.post('/', (req, res, next) => {

    //hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    //posting user info from body
    const id = userbase.length + 1;
    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;


    //using the user constructor from user.mjs to fill in info
    const user = new User(id, username, email, password)

    // Generate JWT token
    const token = generateToken(user);

    //checking if user already exists
    const userExists = userbase.find(u => u.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
    } else if (username != "" && email != "" && password != "") {
        userbase.push(user)
        console.log(userbase);

        //status 201 stands for created
        res.status(201).json({
            createdUser: user,
            token: token
        })
    }

})

USERS.post('/login', async (req, res, next) => {

    //hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    //getting email and password from body
    const email = req.body.email;
    const password = hashed

    // Find user by email
    const user = userbase.find(usr => usr.email === email);

    // Check if user exists
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    if (user.password === password) {
        // Generate JWT token
        const token = generateToken(user);

        res.json({ message: 'Login successful with token:', token });
    }

    // Generate JWT token
    const token = generateToken(user);

});


//get user by id
USERS.get('/:id', (req, res, next) => {

    const userId = req.params.id;

    //finding user in the userbase
    const userById = userbase.filter(function (user) {
        return user.id === userId;

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

// function to create JWT token
function generateToken(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, secretKey, { expiresIn: '24h' }); // token expires in 24 hours
}

export default USERS;