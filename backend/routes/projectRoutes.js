const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {createProject, allProjects} = require('../controllers/projectControllers')

const router = express.Router()
router.route('/').post(protect, createProject).get(protect, allProjects)

module.exports=router;