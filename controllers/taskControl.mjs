import DataHandler from "../modules/storage.mjs";

class TaskController {

    async createTask (task, listId) {
        // Add a new task to the db
        try {
            console.log("Task: ", task,listId);
            
            let response = await DataHandler.makeTask(task, listId);
            console.log("createTask resp", response);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    } 

    async getTasks() {
        try {
            let response = await DataHandler.getAllTasks();
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