import express from "express";
import USERS from "./routes/usersRoute.mjs";
import LISTS from "./routes/listRoute.mjs";
import TASKS from "./routes/taskRoute.mjs";
import bodyParser from "body-parser";
import corsAccess from "./middleware/corsAccess.mjs";
import calendar from "./middleware/calendar.mjs";
import translations from "./middleware/translation.mjs";
import path from "path"; // Import path module for resolving file paths

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(corsAccess);
app.use(calendar);
app.use(translations);

// ROUTES
app.use('/list', LISTS);
app.use('/task', TASKS);
app.use('/user', USERS);

// MAIN SITE REDIRECT
app.get('/', (req, res, next) => {
    res.redirect(`https://prioritask.onrender.com/createUser.html`);
});

// GET SERVICE WORKER PATH
app.get('/service-worker.mjs', (req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'service-worker.mjs');
    res.sendFile(filePath);
});

// GET CURRENT CALENDAR DATA
app.get('/calendar', (req, res, next) => {
    res.json(req.calendar);
});

// GET TRANSLATIONS
app.get('/translations', (req, res) => {
    const lang = req.query.lang || 'en'; 
    const translation = req.language[lang] || req.language['en']; 
    res.json(translation);
});

export default app;