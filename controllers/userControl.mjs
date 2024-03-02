import DataHandler from "../modules/storage.mjs";

class UserController {
    // All user functions

    // Create a new user in the database
    async createUser(id, username, email, password) {
        try {
            console.log("username: ", username);
            console.log("email: ", email);
            console.log("password: ", password);
            
            let response = await DataHandler.insertUser(id, username, email, password);
            return response;
        } catch (error) {
            console.error(error)
        }
    }

}





export default UserController;