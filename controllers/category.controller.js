/**
 * this file contains the controller logic for
 * the category resource
 */

const db = require('../models');
const Category = db.category;

/**
 * POST: Create and save a new category
 */

exports.create = (req, res) => {
    /**
     * Validation of request body
     */

    if(!req.body.name){
        res.status(400).send({
            message: "Name of the category cant be empty!"
        })
        return;
    }

    /**
     * Creation of the category object to be stored in the db
     */

    const category = {
        name: req.body.name,
        description: req.body.description
    };

    Category.create(category).then(category => {
        console.log(`Category name: ${category.name} got inserted into the db`);
        res.send(200).send(category);

    }).catch(err => {
        console.log("Issue in inserting category name:", category.name);
        console.log("Error Message:", err.message);
        res.status(500).send({
            message: "Some internal error while storing the category in db"
        });
    });
}


/**
 * GET: get all the category and category based on name
 */

exports.findAll = (req,res) => {

    let categoryName = req.query.name;
    let promise;
    if(categoryName) {
        promise = Category.findAll({
            where:{
                name: categoryName
            }
        });
    }else{
        promise = Category.findAll();
    }

    promise
    .then(categories => {
        res.status(200).send(categories);
    })
    .catch( err => {
        res.status(500).send({
            message: "Some internal error while fetching the categories"
        });
    })
}


/**
 * Get the category based on the category id
 */

exports.findOne = (req,res) => {

    const categoryId = req.params.id;

    Category.findByPk(categoryId)
    .then(category => {
        res.status(200).send(category);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the categories"
        })
    })
}

/**
 * update the category
 */

exports.update = (req, res) => {

    const category ={
        name: req.body.name,
        desc: req.body.description
    }

    const categoryId = req.params.id;

    Category.update(category)
    .then(updateCategory => {
        /**
         * Where the  updation happened successfully
         * you need to send the updated row to the table
         * but while fetching that row and sending it to the
         * user there can be error
         */
        Category.findByPk(categoryId)
        .then(category =>{
            res.status(200).send(category);
        })
        .catch(
            res.status(500).send({
                message: "SOme internal error while fetching the categories"
            })
        )
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the categories"
        })
    })
}