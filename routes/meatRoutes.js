const express = require('express');
const mongoose = require('mongoose')
const meatRouter = express.Router();
// const Meat = mongoose.model("Meat", require("../models/meat"));

const conn = mongoose.createConnection('mongodb://localhost:27017/meat')
const Meat = conn.model('Meat', require('../models/meat'))

meatRouter.get("/", async (req,res) => {
    const meats = await Meat.find()
	res.send(meats)
})

meatRouter.get("/:category", async (req,res) => {
    let category = req.params.category
    let regex = new RegExp(`${category}`)
    console.log("in meat category")


     await Meat.find({catagories: regex}).sort(req.query.sorting).exec((error, result) => {
        if (error) console.log(error)
        else res.send(result)
    })
})

    meatRouter.put("/:id", async (req,res) => {
        console.log(req.params.id)
        console.log(req.body)
        Meat.findByIdAndUpdate(
            // the id of the item to find
            req.params.id,
            
            // the change to be made. Mongoose will smartly combine your existing 
            // document with this change, which allows for partial updates too
            req.body,
            
            // an option that asks mongoose to return the updated version 
            // of the document instead of the pre-updated one.
            {new: true},
            
            // the callback function
            (err, meat) => {
            // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send(meat);
            }
        )
        

        // company = _.extend(company, req.body);
    })

    meatRouter.post("/", async (req,res) => {
        const product = req.body

        console.log(product)
        await new Meat({
            name: product.name,
            price: product.price,
            unit: product.unit,
            description: product.description,
            popularity: 0,
            pictures:   product.pictures,
            catagories: product.catagories
        }).save()
    })

    meatRouter.get("/search/:search", async (req,res) => {
        let search = req.params.search
        let regex = new RegExp(`.*${search}.*`,'i')
    
        await Meat.find({name:regex}).sort(req.query.sorting).exec((error, result) => {
        if (error) console.log(error)
        else res.send(result)
    })
})

module.exports = meatRouter;