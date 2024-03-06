import express from "express";
import Task from "../modules/task.mjs";
import TaskController from "../controllers/taskControl.mjs";

const TASKS = express.Router();
const taskController = new TaskController();


TASKS.post('/', async (req, res) => {
    let task  = req.body.task;
    let listId  = req.body.listId;
  
    const newTask = new Task(task, listId);
  
    const createdTask = await taskController.createTask(newTask.task, newTask.listId);
    console.log("the created task is: ", createdTask)
    res.status(200).send(createdTask);
  });
  
  // GET ALL TASKS
  
  TASKS.get('/', async (req, res) => {
    
    
    // Send a request to the task module to get all tasks
    const getTasks = await taskController.getTasks();
  
    res.status(200).json(getTasks);
    // return tasks;
    
  });
  
  // GET ALL TASKS WITH THAT LIST ID
  
  TASKS.get('/:listId', async (req, res) => {
    
    
    const { listId }  = req.params;
    
    const tasksFoundInList = await taskController.tasksByList(listId);
    console.log("the task was found", tasksFoundInList)
    res.status(200).json(tasksFoundInList);
  });
  
  // PUT / UPDATE A TASK
  
  TASKS.put('/tasks/:id', async (req, res) => {
    
    const { task } = req.body;
    const { id } = req.params;
    
    const updatedTask = await taskController.updateTask(task, id);
    console.log("the task was updated", updatedTask)
    res.status(200).json(updatedTask);
  });
  
  TASKS.get('/tasks/:id', async (req, res) => {
    
    const { task } = req.body;
    const { id } = req.params;
    
    const getTask = await taskController.oneTask(id, task);
    console.log("the task was found", getTask)
    res.status(200).json(getTask);
  });
  
  // PUT / UPDATE A TASK
  
  TASKS.put('/tasks/:id', async (req, res) => {
    
    const { task } = req.body;
    const { id } = req.params;
    
    const updatedTask = await taskController.updateTask(task, id);
    console.log("the task was updated", updatedTask)
    res.status(200).json(updatedTask);
  });
  
  // DELETE A TASK
  
  TASKS.delete('/tasks/:id', async (req, res) => {
    
    const { id } = req.params;
    
    // Send a request to the task module to delete task
    const deleteTasks = await taskController.deleteTask(id);
  
    res.status(200).json(deleteTasks);
    // return tasks;
    
  });

  export default TASKS;