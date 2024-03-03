import DataHandler from "../modules/storage.mjs";

class ListController {
    // All list functions
    
    async createList (list) {
        // Add a new list to the db
        try {
            console.log("Listname: ", list);
            
            let response = await DataHandler.makeList(list);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }

    async getLists() {
        try {
            let response = await DataHandler.getAllLists();
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
            console.log("id: ", id)
            let response = await DataHandler.eraseList(id);
           
            return response;
        } catch (error) {
            console.error(error)
        }
    
    }
}

export default ListController;