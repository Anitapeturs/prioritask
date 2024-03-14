import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/userControl.mjs';

const userController = new UserController();
const secretKey = process.env.SECRET_KEY;

const Auth = async (req, res, next) => {

    const password = req.body.password;
    const username = req.body.username;

    // hashing the password
    const hashed = crypto.createHash('sha256').update(password).digest('hex');

    try {
        // Check if the user exists and credentials are valid
        const authUser = await userController.userAuth(username, hashed);

        if (!authUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // if authentication is successful, create JWT token
        const token = jwt.sign({ userId: authUser.id, username: authUser.username }, secretKey, { expiresIn: '1h' });

        // attach the authenticated user and token to the request
        req.authUser = authUser;
        req.token = token;

        return next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default Auth;