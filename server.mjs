import http from "http"
import app from "./app.mjs"



// selecting a port for the server to use.

const port = process.env.PORT || 10000;

const server = http.createServer(app)


// starting the server 
server.listen(port, () => {
    console.log("Server listening on port:10000")
});


