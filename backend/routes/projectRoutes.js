const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {createProject, allProjects, deleteProject} = require('../controllers/projectControllers')

const router = express.Router()
router.route('/').post(protect, createProject).get(protect, allProjects)
router.route('/delete').post(protect, deleteProject)

module.exports=router;