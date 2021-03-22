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
    const meats = await Meat.find({catagories: regex})
    res.send(meats)
})

module.exports = router;