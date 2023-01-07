const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {createProject} = require('../controllers/projectControllers')

const router = express.Router()
router.route('/').post(protect, createProject)

module.exports=router;