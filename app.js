require("dotenv").config();
const passwordReset = require("./routes/passwordReset");
var logger = require('morgan');
const express = require('express')
const path = require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const voyageRouter = require('./routes/voyagecarte.route')
const reserRouter = require('./routes/reser.route')
const ajouterOffreRouter = require('./routes/ajouterOffre.route')
const flash = require('connect-flash')
const app = express()
const authRouter = require('./routes/auth.rout')
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(flash())
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/SunWay-Travel',
    collection: 'sessions'
})

app.use(session({
    secret: "c'est mon premier projet en dev web",
    saveUninitialized: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    store: STORE

}))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use("/password-reset", passwordReset);
app.get('/get-email', function (req, res, next) {
    res.render('get-email', {
        title: 'Forget Password Page',
    });
});
app.get('/password-reset/:userId/:token', function (req, res, next) {
    res.render('reset-password', {
        title: 'Reset Password Page',
        userId: req.params.userId,
        token: req.params.token
    });
});
app.use('/', authRouter)
app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', voyageRouter)
app.use("/reser", reserRouter)
app.use("/ajouterOffre", ajouterOffreRouter)

app.get('/', (req, res, next) => {
    res.render('index')
})
app.listen(3000, (err) => {
    console.log(err)
    console.log('server listen on port 3000')
})