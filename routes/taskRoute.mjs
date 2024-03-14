import express from "express";
import TaskController from "../controllers/taskControl.mjs";
import { HTTPCodes } from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/superLogger.mjs";

const TASKS = express.Router();
const taskController = new TaskController();

TASKS.post('/', async (req, res, next) => {
  try {
    let task = req.body.task;
    let listId = req.body.listId;
    let userId = req.body.userId;

    if (task !== "") {
      const createdTask = await taskController.createTask(task, listId, userId);
      res.status(HTTPCodes.SuccesfulResponse.Ok).send(createdTask);
    };
  } catch (error) {
    SuperLogger.log(`Error creating task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error creating task' });
  }
});

// GET ALL TASKS
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

TASKS.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const getTask = await taskController.oneTask(id);
    console.log("the task was found", getTask);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(getTask);
  } catch (error) {
    SuperLogger.log(`Error retrieving task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error retrieving task' });
  }
});

// GET ALL TASKS WITH THAT LIST ID
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

// PUT / UPDATE A TASK
TASKS.put('/:id', async (req, res, next) => {

  const task = req.body.task;
  const completed = req.body.completed;
  const id = req.params.id;

  if (task !== "") try {

    const updatedTask = await taskController.updateTask(task, id, completed);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedTask);
  }
    catch (error) {
      SuperLogger.log(`Error updating task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
      res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating task' });
    }
});

// DELETE A TASK
TASKS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteTasks = await taskController.deleteTask(id);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(deleteTasks);
  } catch (error) {
    SuperLogger.log(`Error deleting task: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting task' });
  }
});

// DELETE A TASK
TASKS.delete('/list/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteListTasks = await taskController.deleteListTasks(id);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(deleteListTasks);
  } catch (error) {
    SuperLogger.log(`Error deleting tasks in list: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error deleting tasks in list' });
  }
});

TASKS.put('/completed/:id', async (req, res, next) => {
  try {
    const completed = req.body.completed;
    const id = req.params.id;
    const updatedTask = await taskController.checkedTask(completed, id);
    console.log("the task was updated", updatedTask);
    res.status(HTTPCodes.SuccesfulResponse.Ok).json(updatedTask);
  } catch (error) {
    SuperLogger.log(`Error updating task completion status: ${error.message}`, SuperLogger.LOGGING_LEVELS.CRITICAL);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).json({ error: 'Error updating task completion status' });
  }
});

export default TASKS;