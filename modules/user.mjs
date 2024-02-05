
class User {

    constructor(id, username, email, password) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password


        console.log("you did it! its a new user: " + this.id, this.username, this.email, this.password)
       
        
    }
}

export default User;