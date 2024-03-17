import express from "express";
import TaskController from "../controllers/taskControl.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/superLogger.mjs";
import path from "path"; // Import path module for resolving file paths

const TASKS = express.Router();
const taskController = new TaskController();

// GET SERVICE WORKER PATH
TASKS.get('/service-worker.mjs', (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'service-worker.mjs');
  res.sendFile(filePath);
});

// CREATE A NEW TASK
TASKS.post('/', async (req, res, next) => {
  try {
    let task = req.body.task;
    let listId = req.body.listId;
    let userId = req.body.userId;

    if (task !== "") {
      const createdTask = await taskController.createTask(task, listId, userId);
      SuperLogger.log(`Task created: ${createdTask.task}`, SuperLogger.LOGGING_LEVELS.NORMAL);
      res.status(HTTPCodes.SuccesfulResponse.Ok).send(createdTask);
    };
  } catch (error) {
    SuperLogger.log(`Error creating task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error creating task' });
  }
});

// GET ALL TASKS FOR A USER
TASKS.get('/user/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getTasks = await taskController.getTasks(userId);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(getTasks);
  } catch (error) {
    SuperLogger.log(`Error retrieving tasks: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving tasks' });
  }
});

// GET A TASK BY ID
TASKS.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const getTask = await taskController.oneTask(id);
    SuperLogger.log(`Task retrieved: ${getTask.task}`, SuperLogger.LOGGING_LEVELS.NORMAL);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(getTask);
  } catch (error) {
    SuperLogger.log(`Error retrieving task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving task' });
  }
});

// GET ALL TASKS FOR A LIST
TASKS.get('/list/:id', async (req, res, next) => {
  try {
    const listId = req.params.id;
    const tasksFoundInList = await taskController.tasksByList(listId);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(tasksFoundInList);
  } catch (error) {
    SuperLogger.log(`Error retrieving tasks in list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving tasks in list' });
  }
});

// UPDATE A TASK
TASKS.put('/:id', async (req, res, next) => {
  try {
    const task = req.body.task;
    const completed = req.body.completed;
    const id = req.params.id;

    const updatedTask = await taskController.updateTask(task, id, completed);
    SuperLogger.log(`Task updated: ${updatedTask.task}`, SuperLogger.LOGGING_LEVELS.NORMAL);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedTask);
  } catch (error) {
    SuperLogger.log(`Error updating task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating task' });
  }
});

// DELETE A TASK BY ID
TASKS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteTasks = await taskController.deleteTask(id);
    SuperLogger.log(`Task deleted: ID ${id}`, SuperLogger.LOGGING_LEVELS.NORMAL);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(deleteTasks);
  } catch (error) {
    SuperLogger.log(`Error deleting task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting task' });
  }
});

// DELETE TASKS BY LIST ID
TASKS.delete('/list/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteListTasks = await taskController.deleteListTasks(id);
    SuperLogger.log(`Tasks deleted for list ID ${id}`, SuperLogger.LOGGING_LEVELS.NORMAL);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(deleteListTasks);
  } catch (error) {
    SuperLogger.log(`Error deleting tasks in list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting tasks in list' });
  }
});

// UPDATE TASK COMPLETION STATUS
TASKS.put('/completed/:id', async (req, res, next) => {
  try {
    const completed = req.body.completed;
    const id = req.params.id;
    const updatedTask = await taskController.checkedTask(completed, id);
    SuperLogger.log(`Task completion status updated: ID ${id}`, SuperLogger.LOGGING_LEVELS.NORMAL);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedTask);
  } catch (error) {
    SuperLogger.log(`Error updating task completion status: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating task completion status' });
  }
});

export default TASKS;