const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/SunWay-Travel";
const demandeSchema= mongoose.Schema({
    StyleVoyage:String,
lieu: String,
destination: String,
depart: Date,
retour: Date,
adulte: Number,
enfant: Number,
nombrechambre: Number,
MoyenTransport: String,
budjet: Number,
description: String,
userId: String
})

const Demande = mongoose.model("demande", demandeSchema) // definir schema de l offre 
exports.createdemande = (StyleVoyage, lieu, destination, depart, retour, adulte,enfant,nombrechambre,MoyenTransport,budjet,description,userId) =>{

    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>
        {
            console.log("connected to a database");
         return Demande.findOne({userId: userId,lieu:lieu,StyleVoyage:StyleVoyage,destination:destination,
            depart:depart,retour:retour,adulte:adulte,enfant:enfant,
        nombrechambre:nombrechambre,MoyenTransport:MoyenTransport,budjet:budjet,
    description:description})  
        }).then(demande =>{
            if (demande){ 
                mongoose.disconnect()
            reject('demande déjà effectuée');}
        }).then( () =>{ 
            let demande = new Demande({
                StyleVoyage: StyleVoyage,
                lieu:lieu,
                destination: destination,
                depart: depart,
                retour:retour,
                adulte:adulte,
                enfant:enfant,
                nombrechambre:nombrechambre,
                MoyenTransport:MoyenTransport,
                budjet:budjet,
                description: description,
                userId:userId
                
            })
            return demande.save()
        }).then(() =>{
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)})
    })
};

 

