//contains all of the routes that are related to the user
const express = require('express')
//destructured import, only import the functions you need
const {registerUser, authUser} = require("../controllers/userControllers");

//create instance of router using express
const router = express.Router()

//If you do route.route('/login') the endpointwillbe api/user/login
//registerUser,authUser will be a controller and have the logic for it
//router.route('/').post(registerUser)
//router.post('/login',authUser)

//essentially if you do a post request and send to this domain
//you callthe controller registerUser which has its own logic:
//specifically it will perform a async handler and deal with the single users information
//in the form of req.body;
router.route("/").post(registerUser)
router.post("/login", authUser)

module.exports = router;