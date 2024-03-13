import express from "express";
import TaskController from "../controllers/taskControl.mjs";
import { AppError, errorHandler } from "../modules/errorHandler.mjs";;

const TASKS = express.Router();
const taskController = new TaskController();

TASKS.use(errorHandler);

TASKS.post('/', async (req, res, next) => {
  try {
    let task = req.body.task;
    let listId = req.body.listId;
    let userId = req.body.userId;

    const createdTask = await taskController.createTask(task, listId, userId);
    console.log("the created task is: ", createdTask);
    res.status(200).send(createdTask);
  } catch (error) {
    next(new AppError(500, 'Error creating task'));
  }
});

// GET ALL TASKS
TASKS.get('/user/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const getTasks = await taskController.getTasks(userId);
    res.status(200).json(getTasks);
  } catch (error) {
    next(new AppError(500, 'Error retrieving tasks'));
  }
});

TASKS.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const getTask = await taskController.oneTask(id);
    console.log("the task was found", getTask);
    res.status(200).json(getTask);
  } catch (error) {
    next(new AppError(500, 'Error retrieving task'));
  }
});

// GET ALL TASKS WITH THAT LIST ID
TASKS.get('/list/:id', async (req, res, next) => {
  try {
    const listId = req.params.id;
    const tasksFoundInList = await taskController.tasksByList(listId);
    res.status(200).json(tasksFoundInList);
  } catch (error) {
    next(new AppError(500, 'Error retrieving tasks in list'));
  }
});

// PUT / UPDATE A TASK
TASKS.put('/:id', async (req, res, next) => {
  try {
    const task = req.body.task;
    const completed = req.body.completed;
    const id = req.params.id;
    console.log(completed, id);
    const updatedTask = await taskController.updateTask(task, id, completed);
    console.log("the task was updated", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(new AppError(500, 'Error updating task'));
  }
});

// DELETE A TASK
TASKS.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteTasks = await taskController.deleteTask(id);
    res.status(200).json(deleteTasks);
  } catch (error) {
    next(new AppError(500, 'Error deleting task'));
  }
});

// DELETE A TASK
TASKS.delete('/list/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteListTasks = await taskController.deleteListTasks(id);
    res.status(200).json(deleteListTasks);
  } catch (error) {
    next(new AppError(500, 'Error deleting tasks in list'));
  }
});

TASKS.put('/completed/:id', async (req, res, next) => {
  try {
    const completed = req.body.completed;
    const id = req.params.id;
    const updatedTask = await taskController.checkedTask(completed, id);
    console.log("the task was updated", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(new AppError(500, 'Error updating task completion status'));
  }
});



export default TASKS;