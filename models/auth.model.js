const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_URL = "mongodb://localhost:27017/SunWay-Travel";

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    nom: String,
    prenom: String,
    téléphone: String
});
const agenceSchema = mongoose.Schema({
    email: String,
    password: String,
    nom: String,
    téléphone: Number,
    adresse: String,
    registerNumber: Number,
    CodePostal: Number
});

const Agence = mongoose.model("agence", agenceSchema)
const User = mongoose.model("user", userSchema);
module.User = { User };

const createNewUser = (email, password, nom, prénom, téléphone) => {

    //check if email exists
    //yes ==== email exists already
    //no ==== newAccount
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            console.log("connected to a database");
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                //mongoose.disconnect()
                reject('adresse mail déjà utilisée');
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashPassword => {
            let user = new User({
                email: email,
                password: hashPassword,
                nom: nom,
                prénom: prénom,
                téléphone: téléphone
            })
            return user.save()
        }).then(() => {
            //mongoose.disconnect()
            resolve()
        }).catch(err => {
            // mongoose.disconnect()
            reject(err)
        })
    })
};

const createNewAgent = (email, password, nom, téléphone, adresse, registerNumber, CodePostal) => {

    //check if email exists
    //yes ==== email exists already
    //no ==== newAccount
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            console.log("connected to a database");
            return Agence.findOne({ email: email })
        }).then(agence => {
            if (agence) {
                // mongoose.disconnect()
                reject('adresse mail déjà utilisée');
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashPassword => {
            let agence = new Agence({
                email: email,
                password: hashPassword,
                nom: nom,
                téléphone: téléphone,
                adresse: adresse,
                registerNumber: registerNumber,
                CodePostal: CodePostal
            })
            return agence.save()
        }).then(() => {
            //mongoose.disconnect()
            resolve()
        }).catch(err => {
            // mongoose.disconnect()
            reject(err)
        })
    })
};


const login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() =>

            User.findOne({ email: email })).then(user => {
                if (!user) {
                    // mongoose.disconnect()
                    reject('aucun utilisateur avec cette adresse email')
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            // mongoose.disconnect()
                            reject('mot de passe incorrect')
                        } else {
                            mongoose.disconnect()
                            resolve(user._id)
                        }
                    });
                }
            }).catch(err => {
                //mongoose.disconnect();
                reject(err)
            })
    });

};
const loginagence = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() =>

            Agence.findOne({ email: email })).then(agence => {
                if (!agence) {
                    //mongoose.disconnect()
                    reject('aucun utilisateur avec cette adresse email')
                } else {
                    bcrypt.compare(password, agence.password).then(same => {
                        if (!same) {
                            // mongoose.disconnect()
                            reject('mot de passe incorrect')
                        } else {
                            mongoose.disconnect()
                            resolve(agence._id)
                        }
                    });
                }
            }).catch(err => {
                //mongoose.disconnect();
                reject(err)
            })
    });

};



module.exports = { User, createNewAgent, createNewUser, login, loginagence }

/*
exports.loginadmin = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect( DB2_URL)

    })
}*/