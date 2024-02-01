import express from "express";
import User from "../modules/user.mjs";
import crypto from "crypto"
const USERS = express.Router();

const userbase = [];

USERS.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'handling GET requests to /user'
    })
})

USERS.post('/', (req, res, next) => {

    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;

    const user = new User(username, email, password)

    if (user.username != "" && user.email != "" && user.password != "") {
        userbase.push(user)
        console.log(userbase);
    } 

    //status 201 stands for created
    res.status(201).json({
        message: 'handling POST requests to /user',
        createdUser: user
    })
})

USERS.get('/:id', (req, res, next) => {

    const userid = req.params.id;

    if (userid === 'special') {
        res.status(200).json({
            message: 'you discovered the special id:',
            id: userid

        })
    } else {
        res.status(200).json({
            message: 'you passed an id'
        })
    }

    // Tip: All the information you need to get the id part of the request can be found in the documentation 
    // https://expressjs.com/en/guide/routing.html (Route parameters)

    /// TODO: 
    // Return user object
})


USERS.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST requests to /user'
    })

});






USERS.put('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'handling PUT requests to /user'
    })
})

USERS.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'handling DELETE requests to /user'
    })
})

export default USERS;