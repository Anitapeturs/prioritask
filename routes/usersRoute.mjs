import express from "express";
import User from "../modules/user.mjs";
import crypto from "crypto"
const USERS = express.Router();

//array where users are stored
const userbase = [];


USERS.post('/', (req, res, next) => {

    //hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    //posting user info from body
    const id = req.body.id
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
        console.log(userbase);

        //status 201 stands for created
        res.status(201).json({
            createdUser: user
        })
    }

})

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

        const userId = req.params.id;

        if (userbase[i].id === userId) {
            userbase[i].username = req.body.username;
            userbase[i].email = req.body.email;
        }
        console.log('userbase was updated: ', userbase[i])
    }


    res.status(200).json({
        message: 'handling PUT requests to /user'
    })
})

//delete user by id
USERS.delete('/:id', (req, res, next) => {

    //finding the user by id to delete
    const indexToRemove = userbase.findIndex((usr) => usr.id === req.params.id);
    userbase.splice(indexToRemove, 1);
    console.log(userbase);

    res.status(200).json({
        message: 'user deleted'
    })
})

export default USERS;