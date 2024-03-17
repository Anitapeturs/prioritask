import DataHandler from "../modules/storage.mjs";

class UserController {
    
    // CREATE A NEW USER
    async createUser(username, email, password) {
        try {
            let response = await DataHandler.insertUser(username, email, password);
            return response
        } catch (error) {
            console.error(error)
        }
    }

    // CHECK IF A USER EXISTS BY EMAIL
    async userExists(email) {
        try {
            let response = await DataHandler.existingUser(email);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // AUTHENTICATE A USER WITH USERNAME AND PASSWORD
    async userAuth(username, password) {
        try {
            let response = await DataHandler.validUser(username, password);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // GET USER INFORMATION BY USER ID
    async oneUser(userId) {
        try {
            let response = await DataHandler.getUser(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    // UPDATE THE USERNAME OF A USER BY USERID
    async updateUser(username, id) {
        try {
            console.log("User: ", username, id)
            let response = await DataHandler.editUser(username, id);
            return response;
        } catch (error) {
            console.error(error)
        }

    }

    // DELETE A USER BY THE USER ID
    async deleteUser(id) {

        try {
            console.log("id: ", id)
            let response = await DataHandler.eraseUser(id);
            console.log("delete user resp", response);
            return response;
        } catch (error) {
            console.error(error)
        }
    };

}

export default UserController;