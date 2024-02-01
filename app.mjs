import express from "express"
import USERS from "./routes/usersRoute.mjs"
import bodyParser from "body-parser"


const app = express();

app.use(bodyParser.json());

//give cors access to any client
app.use((req, res, next) => {
    res.header('Assess-Control-Allow-Origin', '*')
    res.header('Assess-Control-Allow-Headers', '*')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'DELETE', 'GET')
        return res.status(200).json({});
    }
    next();
});


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