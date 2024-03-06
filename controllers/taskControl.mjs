import DataHandler from "../modules/storage.mjs";

class TaskController {

    async createTask (task, listId, userId) {
        // Add a new task to the db
        try {
            
            let response = await DataHandler.makeTask(task, listId, userId);
            console.log("createTask resp", response);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    } 

    async getTasks(userId) {
        try {
            let response = await DataHandler.getAllTasks(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async oneTask(id) {
        try {
            let response = await DataHandler.getTask(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
  

    async updateTask (task, id) {
        // update task in the db
        try {
            console.log("Task: ", task)
            let response = await DataHandler.changeTask(task, id);
            console.log("updateTask resp", response);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    } 

    async deleteTask(id) {

        try {
            console.log("id: ", id)
            let response = await DataHandler.eraseTask(id);
            console.log("updateTask resp", response);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }
    
    async tasksByList(listId) {
    try {
        let response = await DataHandler.getTasksByList(listId);
        return response;
    } catch (error) {
        console.error(error)
    }
}
};



export default TaskController;