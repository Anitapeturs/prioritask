import express from "express";
import ListController from "../controllers/listControl.mjs";

const LISTS = express.Router();
const listController = new ListController();

// CREATE A LIST

LISTS.post('/', async (req, res) => {
    const list  = req.body.listTitle;
    let userId  = req.body.userId;
  
    // Sending newList information into the createList function inside listController(listControl.js)
    const createdList = await listController.createList(list, userId);
    
    res.status(200).json(createdList).end();
  });
  
  
  // GET ALL OF THE USER'S LISTS
  
  LISTS.get('/user/:id', async (req, res) => {
    const userId = req.params.id
    const listsFound = await listController.getLists(userId);
  
    res.status(200).json(listsFound).end();
    // return tasks;
    
  });
  
  
  // GET LIST BY ID
  
  LISTS.get('/:id', async (req, res) => {
    
    const  id  = req.params.id;
    
    const list = await listController.getList(id);
    console.log("the list was found", list)
    res.status(200).json(list);
  });
  
  
  // PUT / UPDATE LIST BY ID
  
  LISTS.put('/:id', async (req, res) => {
    const list = req.body.listTitle;
    const listId = req.params.id;
    
    const updatedList = await listController.updateList(list, listId);
    console.log("the list was updated", updatedList)
    res.status(200).json(updatedList);
  });
  
  
  // DELETE LIST BY ID
  
  LISTS.delete('/:id', async (req, res) => {
    
    const { id } = req.params;
    
    const listDeleted = await listController.deleteList(id);
  
    res.status(200).json(listDeleted);
    
    
  });

  export default LISTS;