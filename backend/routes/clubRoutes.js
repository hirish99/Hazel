const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {createClub, allClubs} = require('../controllers/clubControllers')

const router = express.Router()
router.route('/').post(protect, createClub).get(protect, allClubs)


module.exports=router;