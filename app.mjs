import express from "express"
import USERS from "./routes/usersRoute.mjs"
import LISTS from "./routes/listRoute.mjs"
import bodyParser from "body-parser"
import corsAccess from "./middleware/corsAccess.mjs";
import calendar from "./middleware/calendar.mjs"


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(corsAccess);
app.use(calendar);
app.use('/list', LISTS);
app.use('/user', USERS);

app.get('/', (req, res, next) => {
    res.json({
        message: 'PrioriTask app running'
    });
});



// API endpoint to get current calendar data
app.get('/calendar', (req, res, next) => {
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