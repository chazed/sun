const voyageModel = require('../models/voyagecarte.model')
const validationResult = require('express-validator').validationResult;




exports.getVoyage = (req, res, next) => {

res.render('voyagecarte',{

demError: req.flash("demError")[0],
validationErrors: req.flash('validationErrors'),
isAgence: false,
isUser:false
});
}

exports.postVoyage = (req,res,next)=>{
if(validationResult(req).isEmpty()) {
voyageModel.createdemande( req.body.StyleVoyage, req.body.lieu, req.body.destination, req.body.depart, req.body.retour,
req.body.adulte, req.body.enfant, req.body.nombrechambre, req.body.MoyenTransport,
req.body.budjet, req.body.description, req.session.userId).then(()=> res.redirect('/')).catch(err =>{

req.flash("demError",err),
res.redirect('/voyagecarte') });
}else {
req.flash('validationErrors', validationResult(req).array())
res.redirect('/voyagecarte')

}

}