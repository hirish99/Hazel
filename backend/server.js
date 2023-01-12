//require is a built-in function in node.js with a special purpose to load modules
const express = require("express");
const dotenv = require("dotenv");
//Usually javascript has curly brackets. Here we are putting the chats in this variable
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const projectRoutes = require("./routes/projectRoutes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")
const cors = require("cors")
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const path = require("path")
const axios = require("axios")
const User = require("./models/userModel");

var corsOptions = require('./config/corsOptions')


//Loads `.env` file contents into process.env.
dotenv.config()
connectDB()

//Creates an instance of the express variable
const app = express();

app.use(cors())
app.use(express.json());


/* AUTH0 AUTHENTICATION */
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: 'http://localhost:5000',
    clientID: 'gDuK4C6oOKoE5sHIjc7F0JwPEjaadH0z',
    issuerBaseURL: 'https://dev-x7u0n0vidxu5dgjx.us.auth0.com'


};





// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router







/* AUTH0 AUTHENTICATION */


app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes);

//------------DEPLOYMENT


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production")  {
    app.use(express.static(path.join(__dirname1,"/frontend/build")));

    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })

} else {
    app.get("/", (req, res)=> {
        res.send("API is Running Successfully");
    })
}


  
//------------DEPLOYMENT



/*GOOGLE AUTHENTICATION BUISSNESS */
/* var session = require("express-session");
var passport = require('passport');
var SQLiteStore = require('connect-sqlite3')(session);



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  }));

app.use(session({
secret: 'keyboard cat',
resave: false,
saveUninitialized: false,
store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

var authRouter = require('./routes/auth');
app.use('/', authRouter); */







/*GOOGLE AUTHENTICATION BUISSNESS */




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
        origin: "https://hazel.herokuapp.com/",
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

            socket.in(user._id).emit("message_recieved", newMessageRecieved);
        });
    });

    socket.on('update_chat', (newChatCreated) => {
        var chat_new = newChatCreated;

        console.log("Created");

        if (!chat_new.users) return console.log('no chat users');

        chat_new.users.forEach(user=>{
            socket.in(user._id).emit("update_chat_recieved", newChatCreated);
            console.log("Chat");
        });
    }
    
    
    ) 
});

