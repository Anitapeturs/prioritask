import DataHandler from "../modules/storage.mjs";

class TaskController {

    // CREATE A NEW TASK WITH THE INPUT
    async createTask(task, listId, userId) {
        try {
            let response = await DataHandler.makeTask(task, listId, userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET ALL TASKS FOR THE USER 
    async getTasks(userId) {
        try {
            let response = await DataHandler.getAllTasks(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET A TASK BY TASK ID
    async oneTask(id) {
        try {
            let response = await DataHandler.getTask(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // UPDATE A TASK WITH THE PROVIDED INPUT
    async updateTask(task, id) {
        try {
            let response = await DataHandler.changeTask(task, id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // DELETE A TASK BY TASK ID
    async deleteTask(id) {
        try {
            let response = await DataHandler.eraseTask(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET TASKS ASSOCIATED WITH LIST ID
    async tasksByList(listId) {
        try {
            let response = await DataHandler.getTasksByList(listId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // DELETE ALL TASKS ASSOCIATED WITH THE LIST ID
    async deleteListTasks(listId) {
        try {
            let response = await DataHandler.deleteTasksByList(listId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // MARK A TASK AS COMPLETED OR UNCOMPLETED BY VALUE 
    async checkedTask(completed, id) {
        try {
            let response = await DataHandler.completeTask(completed, id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
};

export default TaskController;