import DataHandler from "../modules/storage.mjs";

class ListController {
    // All list functions
    
    async createList (list, userId) {
        // Add a new list to the db
        try {
            console.log("Listname: ", list);
            
            let response = await DataHandler.makeList(list, userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }

    async getLists(userId) {
        try {
            let response = await DataHandler.getAllLists(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async getList(id) {
        try {
            let response = await DataHandler.getList(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async updateList (list, id) {
        try {
            let response = await DataHandler.changeList(list, id);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    } 

    async deleteList (id) {
        try {
            let response = await DataHandler.eraseList(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }
}

export default ListController;