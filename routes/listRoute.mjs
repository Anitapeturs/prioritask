import express from "express";
import ListController from "../controllers/listControl.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";

const LISTS = express.Router();
const listController = new ListController();

// GET SERVICE WORKER PATH
LISTS.get('/service-worker.mjs', (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'service-worker.mjs');
  res.sendFile(filePath);
});

// CREATE A LIST
LISTS.post('/', async (req, res, next) => {
  try {
    const list = req.body.listTitle;
    let userId = parseInt(req.body.userId);

    // Sending newList information into the createList function inside listController(listControl.js)
    const createdList = await listController.createList(list, userId);

    res.status(HTTPCodes.SuccesfulResponse.Ok).json(createdList);
  } catch (error) {
    SuperLogger.log(`Error creating list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error creating list' });
  }
});

// GET ALL OF THE USER'S LISTS
LISTS.get('/user/:id', async (req, res, next) => {

  try {
    const userId = req.params.id;
    const listsFound = await listController.getLists(userId);

    res.status(HTTPCodes.SuccesfulResponse.Ok).json(listsFound);
  } catch (error) {
    SuperLogger.log(`Error retrieving lists for user: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving lists for user' });
  }
});

// GET LIST BY ID
LISTS.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const list = await listController.getList(id);

    res.redirect(`https://prioritask.onrender.com/shared.html?listId=${list.id}&listTitle=${list.listTitle}`);

  } catch (error) {
    SuperLogger.log(`Error retrieving list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving list' });
  }
});

// PUT / UPDATE LIST BY ID
LISTS.put('/:id', async (req, res, next) => {
  try {
    const list = req.body.listTitle;
    const listId = req.params.id;

    const updatedList = await listController.updateList(list, listId);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedList);
  } catch (error) {
    SuperLogger.log(`Error updating list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating list' });
  }
});

// DELETE LIST BY ID
LISTS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const listDeleted = await listController.deleteList(id);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(listDeleted);
  } catch (error) {
    SuperLogger.log(`Error deleting list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting list' });
  }
});

export default LISTS;