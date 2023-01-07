//require is a built-in function in node.js with a special purpose to load modules
const express = require("express");
const dotenv = require("dotenv");
//Usually javascript has curly brackets. Here we are putting the chats in this variable
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")
const cors = require("cors")
const corsOptions = require('./config/corsOptions')

//Loads `.env` file contents into process.env.
dotenv.config()
connectDB()

//Creates an instance of the express variable
const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

//Essentially by using express you are defining what the physical web server does everytime it makes
//a get request.
//app.get is where you route all get requests. So when the webpage loads it does a get request
//from the web server. You can define a response doing the following:
//abstract all the logic for api/user in userRoutes.js


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

//I'm not sure what's going on with the ${PORT}
const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`)) 

const io = require("socket.io")(server,  {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket)=>{
    console.log('connected to socket.io');

    socket.on('setup',  (userData)=>{
        socket.join(userData._id);
        socket.emit('connected');
    })

    socket.on('join_chat', (room) => {
        socket.join(room);
        console.log(room);
    })

    socket.on('new_message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user=>{
            if (user._id ==  newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })
    })
});

