const router = require('express').Router()//middleware router level


const homeController = require('../controllers/home.controller')

router.get('/', homeController.getHome)

module.exports = router // exporter pour pouvoir l utiliser sur app.js
