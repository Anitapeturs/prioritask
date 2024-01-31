import express from "express";
const USER_API = express.Router();


USER_API.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'handling GET requests to /user'
    })
})


USER_API.get('/:id', (req, res, next) => {


    // Tip: All the information you need to get the id part of the request can be found in the documentation 
    // https://expressjs.com/en/guide/routing.html (Route parameters)

    /// TODO: 
    // Return user object
})


USER_API.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST requests to /user'
    })

});




    

USER_API.put('/:id', (req, res) => {
    /// TODO: Edit user
})

USER_API.delete('/:id', (req, res) => {
    /// TODO: Delete user.
})

module.exports = USER_API