import express from "express"
import USERS from "./routes/usersRoute.mjs"
import bodyParser from "body-parser"
import corsAccess from "./modules/corsAccess.mjs";


const app = express();

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
<<<<<<< Updated upstream
app.use(corsAccess)
=======
app.use(corsAccess);

//calendar middleware
app.use(calendar);
>>>>>>> Stashed changes

//Have the app use the user routes for /user
app.use('/user', USERS)

// API endpoint to get current calendar data
app.get('/calendar', (req, res) => {
    res.json(req.calendar);
});

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