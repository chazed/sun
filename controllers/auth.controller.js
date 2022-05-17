const authModel = require("../models/auth.model");
const validationResult = require('express-validator').validationResult;
exports.getInscrire = (req, res, next) => {
    res.render("register", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false
    });
};
exports.getInscrire2 = (req, res, next) => {
    res.render("register2", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false
    });
};

exports.postInscrireClient = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.createNewUser(req.body.email, req.body.password, req.body.nom, req.body.prenom, req.body.téléphone).then(() => res.redirect('/login')).catch(err => {
            req.flash("authError", err),
                res.redirect("/register");
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/register')
    }

    session

};
exports.postInscrireAgent = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.createNewAgent(req.body.email, req.body.password, req.body.nom, req.body.téléphone, req.body.adresse, req.body.registerNumber, req.body.CodePostal).then(() => res.redirect('/login')).catch(err => {
            req.flash("authError", err)
            res.redirect('/register')
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/register')
    }


};

exports.getLogin = (req, res, next) => {

    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false
    });
};
exports.getLogin1 = (req, res, next) => {

    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAgence: false
    });
};

exports.postLogin = (req, res, next) => {
    authModel
        .login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect("/")
        })
        .catch(err => {
            req.flash("authError", err)
            res.redirect("/login");
        });
};
exports.postLoginagence = (req, res, next) => {
    authModel
        .loginagence(req.body.email, req.body.password)
        .then((id) => {
            req.session.agenceId = id
            res.redirect("/")
        })
        .catch(err => {
            req.flash("authError", err)
            res.redirect("/login");
        });
};
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}