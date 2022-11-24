//require is a built-in function in node.js with a special purpose to load modules
const express = require("express");
const dotenv = require("dotenv");
//Usually javascript has curly brackets. Here we are putting the chats in this variable
const { chats } = require("./data/data");
const connectDB = require("./config/db");

//Creates an instance of the express variable
const app = express()

//Loads `.env` file contents into process.env.
dotenv.config()
connectDB()

//Essentially by using express you are defining what the physical web server does everytime it makes
//a get request.
//app.get is where you route all get requests. So when the webpage loads it does a get request
//from the web server. You can define a response doing the following:
app.get("/", (req, res) => {
    res.send("API CONNOR");
});

app.get("/api/chat", (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    //console.log(req.params.id);
    const singleChat = chats.find(c=>c._id = req.params.id);
    res.send(singleChat)
});

const PORT = process.env.PORT || 5000

//I'm not sure what's going on with the ${PORT}
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`)) 