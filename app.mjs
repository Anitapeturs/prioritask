import express from "express"
import USERS from "./routes/usersRoute.mjs"
import bodyParser from "body-parser"
import corsAccess from "./middleware/corsAccess.mjs";
import calendar from "./middleware/calendar.mjs"


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(corsAccess);
app.use(calendar);

//Have the app use the user routes for /user
app.use('/user', USERS)

// API endpoint to get current calendar data
app.get('/calendar', (req, res) => {
    res.json(req.calendar);
});

//handling errors, expand on this in a middleware.
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