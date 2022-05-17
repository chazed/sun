const validationResult = require("express-validator").validationResult;

exports.getajouterOffre = (req, res, next) => {
    res.render('ajouterOffre', {
        isUser: false,
        isAgence: true
    })
}