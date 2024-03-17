import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/userControl.mjs';

const userController = new UserController();
const secretKey = process.env.SECRET_KEY;

const Auth = async (req, res, next) => {

    const password = req.body.password;
    const username = req.body.username;

    // HASHING THE PASSWORD
    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    try {
        // CHECK IF THE USER EXISTS AND CREDENTIALS ARE VALID
        const authUser = await userController.userAuth(username, hashed);

        if (!authUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // IF AUTHENTICATION IS SUCCESSFUL, CREATE JWT TOKEN
        const token = jwt.sign({ userId: authUser.id, username: authUser.username }, secretKey, { expiresIn: '1h' });

        // ATTACH THE AUTHENTICATED USER AND TOKEN TO THE REQUEST
        req.authUser = authUser;
        req.token = token;

        return next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default Auth;