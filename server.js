// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(8080, () => {
  console.log("Server started! Visit: http://localhost:8080");
});

// API update projectData
app.post("/postProjectData", (request, response) => {
  projectData = request.body;
  response.status(200).send("Update projectData OK!");
});

// API fetch projectData
app.get("/getProjectData", (request, response) => {
  response.status(200).send(projectData);
});
