const router = require("express").Router();
const bodyParser = require("body-parser");



const authGuard = require('./guards/auth.guard')

const ajouterOffrecontroller = require("../controllers/ajouterOffre.controller")

router.get('/', authGuard.isAuth, ajouterOffrecontroller.getajouterOffre)


router.post("/ajouterOffre", authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),



);
module.exports = router