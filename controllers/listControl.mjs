import DataHandler from "../modules/storage.mjs";

class ListController {

    // CREATE A NEW LIST WITH THE INPUT
    async createList(list, userId) {
        try {
            console.log("Listname: ", list);
            let response = await DataHandler.makeList(list, userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET ALL LISTS ASSOCIATED WITH USER 
    async getLists(userId) {
        try {
            let response = await DataHandler.getAllLists(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET A LIST BY LIST ID
    async getList(id) {
        try {
            let response = await DataHandler.getList(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // UPDATE A LIST WITH INPUT
    async updateList(list, id) {
        try {
            let response = await DataHandler.changeList(list, id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // DELETE LIST BY LIST ID
    async deleteList(id) {
        try {
            let response = await DataHandler.eraseList(id);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default ListController;