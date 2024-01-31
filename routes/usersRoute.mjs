import express from "express";
const USERS = express.Router();


USERS.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'handling GET requests to /user'
    })
})


USERS.get('/:id', (req, res, next) => {


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




    

USERS.put('/:id', (req, res) => {
    /// TODO: Edit user
})

USERS.delete('/:id', (req, res) => {
    /// TODO: Delete user.
})

export default USERS;