import express, { response } from "express";
import User from "../modules/user.mjs";
import { HTTPCodes, HTTPMethods } from "../modules/httpConstants.mjs";


const USER_API = express.Router();
USER_API.use(express.json); // This makes it so that express parses all incoming payloads as JSON for this route.

const users = [];


USER_API.get('/:id', (req, res, next) => {


    // Tip: All the information you need to get the id part of the request can be found in the documentation 
    // https://expressjs.com/en/guide/routing.html (Route parameters)

    /// TODO: 
    // Return user object
})


USER_API.post('/', (req, res, next) => {

    // This is using javascript object destructuring.
    // Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
    
        let username = req.body.name;
        let email = req.body.email;
        let password = req.body.pswHash;
      
        // Declaring new user using the User module
        const newUser = new User(username, email, password);
      
        // Sending newUser information into the createUser function inside userController(userControl.js)
        const created = userController.createUser(newUser.username, newUser.email, newUser.password);
        
        res.status(200).json(created).end();
      });

    

USER_API.put('/:id', (req, res) => {
    /// TODO: Edit user
})

USER_API.delete('/:id', (req, res) => {
    /// TODO: Delete user.
})

export default USER_API