//require is a built-in function in node.js with a special purpose to load modules
const express = require("express")
const dotenv = require("dotenv")

//Creates an instance of the express variable
const app = express()

//Loads `.env` file contents into process.env.
dotenv.config()

//Essentially by using express you are defining what the physical web server does everytime it makes
//a get request.
//app.get is where you route all get requests. So when the webpage loads it does a get request
//from the web server. You can define a response doing the following:
app.get("/", (req, res) => {
    res.send("Will Be Login");
});

app.get("/explore", (req, res) => {
    res.send("Explore");
});

app.get("/chat", (req, res) => {
    res.send("Chat");
});

const PORT = process.env.PORT || 5000

//I'm not sure what's going on with the ${PORT}
app.listen(5000, console.log(`Server Started on PORT ${PORT}`)) 