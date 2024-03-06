import DataHandler from "../modules/storage.mjs";

class UserController {
    // All user functions

    // Create a new user in the database
    async createUser(username, email, password) {
        try {
            let response = await DataHandler.insertUser(username, email, password);
            return response
        } catch (error) {
            console.error(error)
        }
    }

    //checking if user exists by searching for the email in database
    async userExists(email) {
        try {
            let response = await DataHandler.existingUser(email);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async userAuth(username, password) {
        try {
            let response = await DataHandler.validUser(username, password);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    async oneUser(userId) {
        try {
            let response = await DataHandler.getUser(userId);
            return response;
        } catch (error) {
            console.error(error)
        }
    }


    async updateUser (username, id) {
        // update user in the db
        try {
            console.log("User: ", username, id)
            let response = await DataHandler.editUser(username, id);
            return response;
        } catch (error) {
            console.error(error)
        }
    
    } 

    async deleteUser(id) {
        // Delete an existing user
    
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