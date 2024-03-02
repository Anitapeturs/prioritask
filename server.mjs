import 'dotenv/config'
import http from "http"
import app from "./app.mjs"


// Selecting a port for the server to use.
const port = (process.env.PORT || 10000);

const server = http.createServer(app)

// Start the server 
server.listen(port)


