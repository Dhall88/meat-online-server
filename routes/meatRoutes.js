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
        var meat = req.body;

        console.log(meat)
        

        // company = _.extend(company, req.body);
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