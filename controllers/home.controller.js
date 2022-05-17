const productsModel = require('../models/products.model')

exports.getHome = (req, res, next) => { // les middleware se font sur conrollers c pour ca et aussi pour home car dans home.router on a utilisé le '/' qui est le home de site  
    // dossier controller qui fait la laison entre view et  models
    // prendre l'offre de database et les operations de databse se trouver sur dossier models 


    /*productsModel.getAllProducts().then(products => { //prendre tt les offres de database et les afficher dans ejs 
        res.render('index', {
            products: products
        })
    })*/

    //get category 
    //if category && category!==all on filtre 
    //else render all


    let category = req.query.category
    let validCategories = ['En famille', 'Entre Amis', 'En Amoreux', 'test']
    let productsPromise
    if (category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category) //prendre tt les offres de database et les afficher dans ejs 

    else productsPromise = productsModel.getAllProducts() //prendre tt les offres de database et les afficher dans ejs 

    productsPromise.then(products => {

        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAgence: req.session.agenceId,
            validationError: req.flash('validationErrors')[0]
        })
    })

}




