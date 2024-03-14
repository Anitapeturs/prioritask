import express from "express";
import crypto from "crypto";
import UserController from "../controllers/userControl.mjs";
import Auth from "../middleware/auth.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/superLogger.mjs";

const USERS = express.Router();
const userController = new UserController();

USERS.post('/login', Auth, (req, res) => {

  // if authentication is successful, get users details and token from the Auth module
  const authUser = req.authUser;
  const token = req.token; 

  console.log(authUser)

  // Send success response with token
  res.status(HTTPCodes.SuccesfulResponse.Ok).json({ message: 'Login successful', token, userId: authUser.id, username: authUser.username });
});


USERS.post('/', async (req, res, next) => {
  try {
    // Hashing password
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    // Extracting user info from request body
    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;

    // Checking if user already exists
    const userCheck = await userController.userExists(email);

    if (userCheck) {
      console.log("User already exists");
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).json({ error: 'User already exists' });
    } else if (username !== "" && email !== "" && password !== "") {
      const created = await userController.createUser(username, email, password);
      res.status(HTTPCodes.SuccesfulResponse.Created).json(created);
    } else {
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).json({ error: 'Invalid input data' });
    }
  } catch (error) {
    SuperLogger.log(`Error creating user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error creating user' });
  }
});

// Get user by id
USERS.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId)
    const getUser = await userController.oneUser(userId);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(getUser);
  } catch (error) {
    SuperLogger.log(`Error retrieving user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving user' });
  }
});

// Update user with PUT
USERS.put('/:id', async (req, res, next) => {
  try {
    const username = req.body.username;
    const id = req.params.id;

    // Update user using userController
    const updatedUser = await userController.updateUser(username, id);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedUser);
  } catch (error) {
    SuperLogger.log(`Error updating user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating user' });
  }
});

// Delete user by id
USERS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    // Delete user using userController
    const userDeleted = await userController.deleteUser(id);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(userDeleted);
  } catch (error) {
    SuperLogger.log(`Error deleting user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting user' });
  }
});

export default USERS;