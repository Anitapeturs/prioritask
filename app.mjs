import express from "express"
import USERS from "./routes/usersRoute.mjs"
import bodyParser from "body-parser"
import corsAccess from "./modules/corsAccess.mjs";
import jwt from "jsonwebtoken"



const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(corsAccess)

//Have the app use the user routes for /user
app.use('/user', USERS)

//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})



app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;