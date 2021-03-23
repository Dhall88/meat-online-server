const express = require('express');
const router = express.Router();
const Meat = require("../models/meat");

router.get("/", async (req,res) => {
    const meats = await Meat.find()
	res.send(meats)
})

router.get("/:category", async (req,res) => {
    let category = req.params.category
    let regex = new RegExp(`${category}`)
    console.log(req.query);
    let sort;

    if(req.query.sorting==='descending') sort = '-price'
    else if (req.query.sorting==='ascending') sort = 'price'
    else if (req.query.sorting==='popularity') sort = 'popularity'
    else if (req.query.sorting==='default') sort = ''

     await Meat.find({catagories: regex}).sort(sort).exec((error, result) => {
        if (error) console.log(error)
        else res.send(result)
    })

    // console.log(meats)
    // res.send(meats)
})

module.exports = router;