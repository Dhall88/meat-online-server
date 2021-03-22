const Meat = require('./models/meat');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/meat')

// Meat.remove({}, err => {
//     if(err) console.log(err)
// });

const meats = [
    new Meat({
        name: "steak",
        price: 299.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "steak",
        price: 199.99,
        unit: "pound",
        description: "Bloody and tasty",
        popularity: 4,
        pictures:   ["steak.jpeg"],
        catagories: ["steak"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    }),
    new Meat({
        name: "Hotdog",
        price: 9.99,
        unit: "package",
        description: "good on a grill",
        popularity: 5,
        pictures:   ["hotdog.jpeg"],
        catagories: ["beef"]
    })
]

for(let i = 0; i<meats.length; i++) {
    meats[i].save();
}