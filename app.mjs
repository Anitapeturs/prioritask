import express from "express"
import USERS from "./routes/usersRoute.mjs"
const app = express();



app.use('/user', USERS)

export default app;