
class User {

    constructor(username, email, password) {

        this.username = username
        this.email = email
        this.password = password


        console.log("you did it! its a new user: " + this.username, this.email, this.password)
       
        
    }
}

export default User;