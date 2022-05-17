const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/SunWay-Travel";

const reserSchema = mongoose.Schema({  //schema de reservation 
    nom: String,
    prix: Number,
    Nombre_Personne: Number,
    userId: String,
    usernom: String,
    userprenom: String,
    productId: String,
    Nombre_enfants: Number,
    Nombre_bebe: Number,
    timestamp: Number // le temps dont le client a demander de reserver 
});

const ReserItem = mongoose.model("reservation", reserSchema);

exports.addNewItem = data => { //prend data et return 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let item = new ReserItem(data);
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>
                ReserItem.find({ userId: userId },
                    {},
                    { sort: { timestamp: 1 } })


            ).then(items => {
                mongoose.disconnect();
                resolve(items);

            }
            )
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    }
    );
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() =>
                ReserItem.updateOne({ _id: id }, newData)

            ).then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    })

};

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => ReserItem.findByIdAndDelete(id))
            .then(() => {
                mongoose.disconnect();
                resolve();

            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}

