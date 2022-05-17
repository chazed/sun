
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/SunWay-Travel'


const ProductSchema = mongoose.Schema({
    nom: String,
    image: String,
    prix: String,
    description: String,
    category: String

})

const Product = mongoose.model('Product', ProductSchema) // definir schema de l offre 

exports.getAllProducts = () => {
    //connexion database
    //get les produits


    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then(products => {

            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte
    })

}


exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {// promise pour qu'on sache que asonchrinos sont  terminés ,  et aussi pour controler qaund est ce que j fait resolve ou rejecte 
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ category: category })
        }).then(products => {
            //mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err)) //en cas d erreur on la rejecte

    })

};

exports.getProductById = (id) => { //prend l id et recherche le produit 
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id); // me retourne le produit de l id 
            })
            .then(product => {
                //mongoose.disconnect();
                resolve(product);
            })
            .catch(err => reject(err));
    });
};

exports.getfirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findOne({}); // me retourne le produit de l id 
            })
            .then(product => {
               // mongoose.disconnect();
                resolve(product);
            })
            .catch(err => reject(err));

    })
}

