import express from "express";
import crypto from "crypto";
import UserController from "../controllers/userControl.mjs";
import Auth from "../middleware/auth.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import path from "path";

const USERS = express.Router();
const userController = new UserController();

// GET SERVICE WORKER PATH
USERS.get('/service-worker.mjs', (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'service-worker.mjs');
  res.sendFile(filePath);
});

// LOG IN USER
USERS.post('/login', Auth, (req, res) => {
  const authUser = req.authUser;
  const token = req.token;

  // LOG SUCCESSFUL LOGIN
  SuperLogger.log(`User logged in: ${authUser.username}`);

  res.status(HTTPCodes.SuccesfulResponse.Ok).json({ message: 'Login successful', token, userId: authUser.id, username: authUser.username });
});

// CREATE NEW USER
USERS.post('/', async (req, res, next) => {
  try {
    // HASH PASSWORD
    var hashed = crypto.createHash('sha256').update(req.body.password).digest('hex');

    // EXTRACT USER INFO FROM REQUEST BODY
    const username = req.body.username;
    const email = req.body.email;
    const password = hashed;

    // CHECK IF USER ALREADY EXISTS
    const userCheck = await userController.userExists(email);

    if (userCheck) {
      SuperLogger.log("User already exists", SuperLogger.LOGGING_LEVELS.NORMAL);
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).json({ error: 'User already exists' });
    } else if (username !== "" && email !== "" && password !== "") {
      const created = await userController.createUser(username, email, password);
      SuperLogger.log(`User created: ${created.username}`);
      res.status(HTTPCodes.SuccesfulResponse.Created).json(created);
    } else {
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).json({ error: 'Invalid input data' });
    }
  } catch (error) {
    SuperLogger.log(`Error creating user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error creating user' });
  }
});

// GET USER BY ID
USERS.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getUser = await userController.oneUser(userId);
    SuperLogger.log(`User retrieved: ${getUser.username}`);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(getUser);
  } catch (error) {
    SuperLogger.log(`Error retrieving user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving user' });
  }
});

// UPDATE USER BY ID
USERS.put('/:id', async (req, res, next) => {
  try {
    const username = req.body.username;
    const id = req.params.id;

    const updatedUser = await userController.updateUser(username, id);
    SuperLogger.log(`User updated: ${updatedUser.username}`);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedUser);
  } catch (error) {
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating user' });
  }
});

// DELETE USER BY ID
USERS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const userDeleted = await userController.deleteUser(id);
    SuperLogger.log(`User deleted: ${userDeleted.username}`);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(userDeleted);
  } catch (error) {
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting user' });
  }
});

export default USERS;