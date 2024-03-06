import express from "express";
import TaskController from "../controllers/taskControl.mjs";

const TASKS = express.Router();
const taskController = new TaskController();


TASKS.post('/', async (req, res) => {
    let task  = req.body.task;
    let listId  = req.body.listId;
    let userId = req.body.userId;
  
    const createdTask = await taskController.createTask(task, listId, userId);
    console.log("the created task is: ", createdTask)
    res.status(200).send(createdTask);
  });
  
  // GET ALL TASKS
  
  TASKS.get('/user/:id', async (req, res) => {
    
    const userId = req.params.id;
    
    // Send a request to the task module to get all tasks with the user id
    const getTasks = await taskController.getTasks(userId);
  
    res.status(200).json(getTasks);
    // return tasks;
    
  });


  TASKS.get('/:id', async (req, res) => {
    const id  = req.params.id;
    
    const getTask = await taskController.oneTask(id);
    console.log("the task was found", getTask)
    res.status(200).json(getTask);
  });

  // GET ALL TASKS WITH THAT LIST ID
  
  TASKS.get('/list/:id', async (req, res) => {
    
    
    const  listId   = req.params.id;
    
    const tasksFoundInList = await taskController.tasksByList(listId);
    res.status(200).json(tasksFoundInList);
  });
  
  // PUT / UPDATE A TASK
  
  TASKS.put('/:id', async (req, res) => {
    
    const { task } = req.body;
    const { id } = req.params;
    
    const updatedTask = await taskController.updateTask(task, id);
    console.log("the task was updated", updatedTask)
    res.status(200).json(updatedTask);
  });
  
  
  
  // DELETE A TASK
  
  TASKS.delete('/:id', async (req, res) => {
    
    const id  = req.params.id;
    
    // Send a request to the task module to delete task
    const deleteTasks = await taskController.deleteTask(id);
  
    res.status(200).json(deleteTasks);
    // return tasks;
    
  });

  export default TASKS;