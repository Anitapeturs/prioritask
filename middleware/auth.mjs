import crypto from "crypto"
import UserController from "../controllers/userControl.mjs";

const userController = new UserController();

const Auth = async (req, res, next) => {
    const pass = req.body.password;
    const usrName = req.body.username;

    //hashing password
    var hashed = crypto.createHash('sha256').update(pass).digest('hex');

    

  // Check if the user exists and credentials are valid
  const authUser = await userController.userAuth(usrName, hashed);

  if (!authUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.authUser = authUser;
  return next()

};

export default Auth;