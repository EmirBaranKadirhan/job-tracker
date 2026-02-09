const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()


router.get('/register', authController.registerGet)

router.post('/register', authController.registerPost)

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', authController.loginPost)

router.post('/logout', authController.logout)

module.exports = router